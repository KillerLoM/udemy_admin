import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { Category } from 'src/app/Model/category';
import { CategoryServiceService } from 'src/app/Service/apiService/category-service.service';
import { UploadServiceService } from 'src/app/Service/apiService/upload-service.service';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.scss']
})
export class AddCoursesComponent implements OnInit {
  listOfItem : any[] | null = [];
  loading = false;
  avatarUrl?: string;
  index = 0;
  categoriesList : Category[];
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  isLinear = false;
  constructor(private _formBuilder: FormBuilder,
    @Inject(CategoryServiceService) private categoryService: CategoryServiceService,
     private msg: NzMessageService,
     @Inject(UploadServiceService) private uploadService: UploadServiceService) {
    this.categoriesList = [];
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
   
    reader.readAsDataURL(img);
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
        info.file.error.message;
        this.loading = false;
        break;
    }
  }
  ngOnInit(): void {
      this.categoryService.getCategories().subscribe(
        (data: Category[]): void => {
          this.categoriesList = data;
          console.log(this.categoriesList );
          this.listOfItem = this.categoriesList;
        },
        (error) =>{
          console.log(error);
        }
        );
  }
  addItem(input: HTMLInputElement): void {
    const value = input.value;
    if(this.listOfItem)
    if (this.listOfItem.indexOf(value) === -1) {
      this.listOfItem = [...this.listOfItem, input.value || `New item ${this.index++}`];
    }
  }
  handleUploadImage(event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgUrl = reader.result;
      var base64String = e.target?.result;

      alert(base64String );
    }
    if (event.target.files && event.target.files.length > 0) {
      reader.readAsDataURL(event.target.files[0]);
      
    }
  
  }
}
