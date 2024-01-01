import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { isThisSecond } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { Courses } from 'src/app/Model/courses';
import { Lessons } from 'src/app/Model/lessons';
import { LessonsService } from 'src/app/Service/apiService/lessons.service';
import { ShareService } from 'src/app/Service/share.service';

@Component({
  selector: 'app-child-lessons',
  templateUrl: './child-lessons.component.html',
  styleUrls: ['./child-lessons.component.scss'],
})
export class ChildLessonsComponent implements OnInit {
  idCourse: number | null = null;
  listOfData: Lessons[] = [];
  isEmpty = true;
  positionList: number[];
  isAdd = false;
  listLessons: Lessons[] = [];
  videoUrl: string | null = null;
  confirmModal?: NzModalRef;
  numberOfLessons = 0;
  positionInit: number = 0;
  selectedValue: any;
  title = 'Tạo bài học mới';

  lengthList = 0;
  isEdit = false;
  lessonsFormGroup = this.formBuilder.group({
    nameControl: ['', Validators.required],
    videoControl: ['', Validators.required],
    positionControl: ['', Validators.required],
  });

  constructor(
    @Inject(ShareService) private shareService: ShareService,
    @Inject(LessonsService) private lessonsService: LessonsService,
    private formBuilder: FormBuilder,
    private modal: NzModalService,
    private msg: NzMessageService
  ) {
    this.idCourse = this.shareService.getIdCourse();
    this.positionList = [];
  }
  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[]
  ): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isVideo = file.type === 'video/mp4' || file.type === 'video/mp3' || file.type === 'video/webm' ;
      const isNotMkv = !file.name.endsWith('.mkv');
      const isLt1G = file.size! / 1024 / 1024 / 1024 < 1;
      if (!isVideo || !isNotMkv) {
        
        this.msg.error('Bạn không thể upload video có dạng .mkv!' + file.type);
        observer.complete();
        return;
      }
      if (!isLt1G) {
        this.msg.error('Video phải nhỏ hơn 1GB!');
        observer.complete();
        return;
      }
      observer.next(isVideo && isNotMkv && isLt1G);
      observer.complete();
    });

  ngOnInit(): void {
    this.getLessons();
  }
  getLessons() {
    if (this.idCourse != null) {
      this.lessonsService.getLessons(this.idCourse).subscribe((data: any) => {
        this.listLessons = data.getLessonsByCourseId.content;
        this.numberOfLessons = data.getLessonsByCourseId.numberOfElements
        console.log(data);
        if (this.listLessons) {
          this.lengthList = this.listLessons.length;
            if (this.listLessons.length > 0) {
              for (let i = 0; i <= this.numberOfLessons ; i++) {
                this.positionList[i] = i + 1;
              }
            }
        }
        if (this.numberOfLessons == 0) {
          this.positionList = [1];
          alert(1);
        }
      });
    }
    return;
  }
  handleAdd(): void {
    this.isAdd = true;
    this.title = 'Tạo bài học mới';
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isAdd = false;
    this.lessonsFormGroup.reset();
    this.videoUrl = '';
    this.selectedValue;
  }
  handleVideoChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'error' && info.file.error.status == 200) {
      this.msg.success(`${info.file.name} đã upload lên hệ thống`);
      this.videoUrl = info.file.error.error.text;
      this.lessonsFormGroup.get('videoControl')?.patchValue(this.videoUrl);
    }
  }
  sendPostRequest(name: string, videoUrl: string, position: number) {
    if (this.idCourse) {
      this.lessonsService
        .postLessons(name, videoUrl, this.idCourse, position)
        .subscribe((data: any) => {
          console.log(data);
          this.msg.success('Đã tạo thành công bài học ' + name);
          this.getLessons();
          this.handleCancel();
        });
    }
  }

  handleSend() {
    const videoUrl = this.lessonsFormGroup.get('videoControl')?.value;
    const name = this.lessonsFormGroup.get('nameControl')?.value;
    const position = Number(
      this.lessonsFormGroup.get('positionControl')?.value
    );
    if (this.isEdit == false) {
      if (position && name && videoUrl) {
        let lesson = this.findItemsByPosition(this.listLessons, position);
        console.log(lesson);
        if (lesson && this.idCourse) {
          this.lessonsService
            .putLessons(
              lesson.id,
              lesson.lessonName,
              lesson.video_url,
              this.idCourse,
              this.positionList.length
            )
            .subscribe((data: any) => {
              this.sendPostRequest(name, videoUrl, position);
            });
        }
        this.sendPostRequest(name, videoUrl, position);
        this.lessonsFormGroup.reset();
      }
    } else {
      let lesson = this.findItemsByPosition(
        this.listLessons,
        this.positionInit
      );
      if (position && name && videoUrl) {
        if (position == this.positionInit && this.idCourse) {
          this.lessonsService
            .putLessons(lesson.id, name, videoUrl, this.idCourse, position)
            .subscribe((data: any) => {
              this.msg.success('Đã cập nhật thành công bài ' + name);
              this.getLessons();
              this.handleCancel();
              this.lessonsFormGroup.reset();
              return;
            });
        }
        else{
          if(position != this.positionInit && this.idCourse){
            let id = this.idCourse;
            let newLesson = this.findItemsByPosition(this.listLessons, position);
            if(newLesson == null || newLesson == undefined){
               this.lessonsService.getLessonByPosition(position).subscribe((data: Lessons) => {
                newLesson = data;
               }, 
               Error=>{
                this.lessonsService
                .putLessons(lesson.id, name, videoUrl, id, position)
                .subscribe((data: any) => {
                  this.msg.success('Đã cập nhật thành công bài ' + name);
                  this.getLessons();
                  this.handleCancel();
                  this.lessonsFormGroup.reset();
                  return;
                });
               })
            }
            this.lessonsService.putLessons(newLesson.id, newLesson.lessonName, newLesson.video_url,id, this.numberOfLessons + 1).subscribe(() => {
              this.lessonsService.putLessons(lesson.id, name, videoUrl, id, position).subscribe((data: any)=>{
                this.msg.success("Đã cập nhật bài " + name + " ở vị trí bài số " + position)
                setTimeout(() =>{
                  this.lessonsService.putLessons(newLesson.id, newLesson.lessonName, newLesson.video_url,id, this.positionInit).subscribe((data) => {
                    this.msg.success("Đã cập nhật bài " + newLesson.lessonName + " ở vị trí bài số " + this.positionInit);
                    this.getLessons();
                    this.handleCancel();
                    this.lessonsFormGroup.reset();
                    return;
                  })
                }, 3000)
              })
            })

          }
        }
      }
    }
  }
  findItemsByPosition(items: Lessons[], input: Number): Lessons {
    console.log(input);
    let index = ~~input;
    console.log(items[index]);
    for (let item of items) {
      if (item.position === index) {
        return item;
      }
    }
    return items[index];
  }
  handleUpdate(id: number) {
    for (let item of this.listLessons) {
      if (item.id === id) {
        this.lessonsFormGroup.get('videoControl')?.patchValue(item.video_url);
        this.lessonsFormGroup.get('nameControl')?.patchValue(item.lessonName);
        console.log(item.position.toString());
        this.lessonsFormGroup
          .get('positionControl')
          ?.patchValue(item.position.toString());
        this.videoUrl = item.video_url;
        this.selectedValue = item.position;
        this.title = 'Cập nhật ' + item.lessonName;
        this.positionInit = Number(
          this.lessonsFormGroup.get('positionControl')?.value
        );
      }
    }

    this.isAdd = true;
    this.isEdit = true;
  }
  handleDeleteVideo(): void {
    this.videoUrl = '';
    this.lessonsFormGroup.get('videoControl')?.setValue('');

  }
  showConfirm(id: number): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Bạn có muốn xóa bài học ?',
      nzContent:
        'Khi bạn bấm vào OK thì bài học này sẽ bị xóa. Để hủy thì ấn vào Cancel',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.3 ? resolve : reject, 1000);
            this.handleDelete(id);
        }).catch(() => console.log('Đã có lỗi')),
    });
  }
  handleDelete(id: number): void{
      this.lessonsService.deleteLessons(id).subscribe((data: any) => {
        this.msg.success('Đã xóa thành công bài học');
        this.getLessons();
      })
  }
}
