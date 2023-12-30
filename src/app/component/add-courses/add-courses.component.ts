import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { Category } from 'src/app/Model/category';
import { Courses } from 'src/app/Model/courses';
import { Objectives } from 'src/app/Model/objectives';
import { GenericResponse } from 'src/app/Response/generic-response';
import { SingleResponse } from 'src/app/Response/single-response';
import { CategoryServiceService } from 'src/app/Service/apiService/category-service.service';
import { CourseService } from 'src/app/Service/apiService/course.service';
import { ObjectivesService } from 'src/app/Service/apiService/objectives.service';
import { UploadServiceService } from 'src/app/Service/apiService/upload-service.service';
import { ShareService } from 'src/app/Service/share.service';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.scss'],
})
export class AddCoursesComponent implements OnInit, AfterViewInit {
  listOfItem: any[] = [];
  idUser: number | null = null;
  objectInput: string[];
  listCourses: Courses[];
  isGetting = true;
  isAdding = false;
  isFinish = false;
  isEdit = false;
  showMessageTitle : string | null = null;
  showMesageSubtitle: string | null = null;
  nextInstructions : string | null = null;
  value = '';
  loading = false;
  avatarUrl?: string;
  nameCourses: string;
  idCourse : number;
  index = 0;
  categoriesList: Category[];
  confirmModal?: NzModalRef;
  displayedColumns = [
    'id',
    'title',
    'subtitle',
    'category',
    'rating',
    'price',
    'avatar',
    'handle',
  ];
  firstFormGroup = this._formBuilder.group({
    nameCtril: ['', Validators.required],
    titleCtril: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    imageCtril: ['', Validators.required],
    objectCtril1: ['', Validators.required],
    objectCtril2: ['', Validators.required],
    objectCtril3: ['', Validators.required],
    objectCtril4: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    categoryCtril: ['', Validators.required],
    priceCtril: ['', Validators.required],
  });

  isLinear = false;
  titleCtril: any;
  nameCtril: any;
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  constructor(
    private _formBuilder: FormBuilder,
    private msg: NzMessageService,
    private modal: NzModalService,
    @Inject(ShareService) private shareService: ShareService,
    @Inject(CategoryServiceService)
    private categoryService: CategoryServiceService,
    @Inject(UploadServiceService) private uploadService: UploadServiceService,
    @Inject(CourseService) private courseService: CourseService,
    @Inject(ObjectivesService) private objectivesService: ObjectivesService
  ) {
    this.categoriesList = [];
    this.objectInput = [];
    this.idUser = this.shareService.getIdUser();
    this.listCourses = [];
    this.nameCourses = '';
    this.idCourse = 0;
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));

    reader.readAsDataURL(img);
  }
  addInit() {
    this.reset();
    this.initForm();
    this.isAdding = true;
  }
  reset() {
    this.isGetting = false;
    this.isAdding = false;
    this.isFinish = false;
  }
  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error(info.file.status);
        console.log(info.file.error.error.text);
        this.avatarUrl = info.file.error.error.text;
        this.loading = false;
        let input = document.getElementById('imgageLink') as HTMLInputElement;
        this.secondFormGroup
          .get('imageCtril')
          ?.patchValue(info.file.error.error.text);
        break;
    }
  }
  setDisplaySuccess(name: string){
    if(this.isEdit == false){
      this.showMessageTitle = 'Thành công';
      this.showMesageSubtitle = 'Bạn đã tạo thành công khóa học ' + name;
      this.nextInstructions = 'Thêm khóa học khác'
    }
    else{
      this.showMessageTitle = 'Thành công';
      this.showMesageSubtitle = 'Bạn đã cập nhật thành công khóa học ' + name;
      this.nextInstructions = 'Thêm khóa học '
    }

  }
  ngAfterViewInit(): void {
    this.idUser = this.shareService.getIdUser();
  }
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data: any): void => {
        this.categoriesList = data;
        console.log(data);
        this.listOfItem = this.categoriesList.map((data) => data.category);
        console.log(this.categoriesList);
        this.renderType();
      },
      (error) => {
        console.log(error);
      }
    );
    this.getCourses();
  }
  getCourses() {
    this.idUser = this.shareService.idUser;
    console.log('ID hien tai' + this.idUser);
    if (this.idUser != null)
      this.courseService.getCourse(this.idUser).subscribe((data: any) => {
        this.listCourses = data;
        console.log(this.listCourses);
      });
  }
  renderType() {
    this.listOfItem = this.categoriesList.map((category) => category.category);
    console.log(this.listOfItem);
  }
  addItem(input: HTMLInputElement): void {
    const value = input.value;
    if (this.listOfItem)
      if (this.listOfItem.indexOf(value) === -1) {
        this.listOfItem = [
          ...this.listOfItem,
          input.value || `New item ${this.index++}`,
        ];
      }
  }
  handleUploadImage(event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgUrl = reader.result;
      var base64String = e.target?.result;
    };
    if (event.target.files && event.target.files.length > 0) {
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  handleSend() {
    let inputObject: string[] = [];
    const objectCtril1Value = this.secondFormGroup.value.objectCtril1;
    const objectCtril2Value = this.secondFormGroup.value.objectCtril2;
    const objectCtril3Value = this.secondFormGroup.value.objectCtril3;
    const objectCtril4Value = this.secondFormGroup.value.objectCtril4;
    if (objectCtril1Value !== null && objectCtril1Value !== undefined) {
      inputObject[0] = objectCtril1Value;
    }
    if (objectCtril2Value !== null && objectCtril2Value !== undefined) {
      inputObject[1] = objectCtril2Value;
    }
    if (objectCtril3Value !== null && objectCtril3Value !== undefined) {
      inputObject[2] = objectCtril3Value;
    }
    if (objectCtril4Value !== null && objectCtril4Value !== undefined) {
      inputObject[3] = objectCtril4Value;
    }
    const titleValue = this.firstFormGroup.value.nameCtril;
    const subtitleValue = this.firstFormGroup.value.titleCtril;
    const thumbUrl = this.secondFormGroup.value.imageCtril;
    const categoryValue = this.thirdFormGroup.value.categoryCtril;
    const priceValue = this.thirdFormGroup.value.priceCtril;
    const priceInput = Number(priceValue);
    if (titleValue && subtitleValue && thumbUrl && categoryValue && priceValue){
    if(this.isEdit == false){
      this.courseService
      .createCourse(
        titleValue,
        subtitleValue,
        categoryValue,
        thumbUrl,
        priceInput
      )
      .subscribe(
        (data: any) => {
          this.nameCourses = data.title;
          this.objectivesService
            .addNewObjectives(data.id, inputObject)
            .subscribe(
              (data: SingleResponse) => {
                console.log(data);
                this.msg.success('Đã tạo thành công khóa ' + titleValue);
                this.getCourses();
                this.setDisplaySuccess(titleValue);
                this.isFinish = true;
              },
              (Error) => {
                this.msg.error('Đã có lỗi khi tạo khóa học ' + titleValue);
              }
            );
        },
        (Error) => {
          this.msg.error('Đã có lỗi khi tạo khóa học ' + titleValue);
        }
      );
    }
    if(this.isEdit){
      this.courseService.updateCourse(this.idCourse, titleValue,
        subtitleValue,
        categoryValue,
        thumbUrl,
        priceInput ).subscribe((data: any) => {
          console.log(data);
          this.msg.success('Đã cập nhật thành công khóa học ' + titleValue);
          this.getCourses();
          this.setDisplaySuccess(titleValue);
          this.isFinish = true;
        })
    }
  }
  }
  onBlur(): void {
    if (
      this.value.charAt(this.value.length - 1) === '.' ||
      this.value === '-'
    ) {
      this.updateValue(this.value.slice(0, -1));
    }
  }
  updateValue(value: string): void {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.value = value;
    }
    if (this.inputElement) this.inputElement!.nativeElement.value = this.value;
  }
  formatNumber(value: string): string {
    const stringValue = `${value}`;
    const list = stringValue.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
  }
  onChange(value: string): void {
    this.updateValue(value);
  }
  initForm(): void {
    let btn = document.getElementById('resetStep') as HTMLButtonElement;
    if (btn) btn.click();
    this.avatarUrl = '';

    this.thirdFormGroup.value.categoryCtril = '';
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.thirdFormGroup.reset();
    if (this.inputElement) {
      this.inputElement.nativeElement.value = '';
    }
  }
  addMoreCourses() {
    this.reset();
    this.initForm();
    this.isAdding = true;
  }
  comeback() {
    this.reset();
    this.isGetting = true;
  }
  handleDelete(id: number) {
    this.showConfirm(id);
  }
  quit() {
    this.reset();
    this.isGetting = true;
  }
  showConfirm(id: number): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Bạn có muốn xóa khóa học?',
      nzContent:
        'Khi bạn bấm vào OK thì khóa học này sẽ bị xóa. Để hủy thì ấn vào Cancel',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.3 ? resolve : reject, 1000);
          this.courseService.deleteCourse(id).subscribe(
            (data: GenericResponse) => {
              this.msg.success('Đã xóa thành công');
              this.getCourses();
            },
            (Error) => {
              this.msg.error('Đã có lỗi');
            }
          );
        }).catch(() => console.log('Oops errors!')),
    });
  }
  handleEdit(id: number) {
    this.idCourse = id;
    this.initForm();
    this.courseService.getDetailCourse(id).subscribe((data: Courses) => {
      console.log(data);
      this.avatarUrl = data.thumbUrl;
      this.firstFormGroup.setValue({
        nameCtril: data.title,
        titleCtril: data.subtitle,
      });
      this.objectivesService.getObjectivesList(id).subscribe((data: any) => {
        if (data.getCourseObjectives && data.getCourseObjectives.length > 0) {
          console.log(data.getCourseObjectives[0].objective);
          this.secondFormGroup.patchValue({
            objectCtril1: data.getCourseObjectives[0].objective,
            objectCtril2: data.getCourseObjectives[1].objective,
            objectCtril3: data.getCourseObjectives[2].objective,
            objectCtril4: data.getCourseObjectives[3].objective,
          });
        }
      });
      this.secondFormGroup.patchValue({
        imageCtril: data.thumbUrl,
      });
      this.thirdFormGroup.setValue({
        categoryCtril: data.category,
        priceCtril: data.price.toString(),
      });
    });
    this.isEdit = true;
    this.reset();
    this.addInit();
  }
}
