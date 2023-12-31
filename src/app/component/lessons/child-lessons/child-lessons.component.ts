import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { isThisSecond } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
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
  listLessons: Lessons[]  = [];
  videoUrl: string | null = null;
  positionInit: number = 0;
  lengthList = 0;
  lessonsFormGroup = this.formBuilder.group({
    nameControl: ['', Validators.required],
    videoControl: ['', Validators.required],
    positionControl: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
  });
  
  constructor(
    @Inject(ShareService) private shareService: ShareService,
    @Inject(LessonsService) private lessonsService: LessonsService,
    private formBuilder: FormBuilder,
    private msg: NzMessageService
  ) {
    this.idCourse = this.shareService.getIdCourse();
    this.positionList=[];
  }
  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
  new Observable((observer: Observer<boolean>) => {
    const isVideo = file.type!.startsWith('video/');
    const isNotMkv = !file.name.endsWith('.mkv'); 
    const isLt1G = file.size! / 1024 / 1024 / 1024 < 1;
    if (!isVideo || !isNotMkv) {
      this.msg.error('Bạn không thể upload video có dạng .mkv!');
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
        if(this.listLessons)
        {console.log(this.listLessons);
          this.lengthList = this.listLessons.length;
          if(this.listLessons)
          if (this.listLessons.length > 0) {
            for(let i = 0; i<=this.listLessons.length; i++){
              this.positionList[i] = i + 1;
            }
          }
          if(this.listLessons.length < 0){
            this.positionList = [1];
          }
        }
      });
    }
    return;
  }
  handleAdd(): void {
    this.isAdd = true;
  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isAdd = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isAdd = false;
  }
  handleVideoChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
   if (info.file.status === 'error' && info.file.error.status == 200 ) {
      this.msg.success(`${info.file.name} đã upload lên hệ thống`);
      this.videoUrl =  info.file.error.error.text;
      this.lessonsFormGroup.get('videoControl')?.patchValue(this.videoUrl);
    }
  }
  handleSend(){
    let name = this.lessonsFormGroup.get('nameControl')?.value;
    let position = this.lessonsFormGroup.get('positionControl')?.value;
    let videoUrl = this.lessonsFormGroup.get('videoControl')?.value;
    if(position){
      let lesson = this.findItemsByPosition(this.listLessons, Number(position));
      console.log(lesson)
      if(lesson && this.idCourse){
        let newPosition = this.positionList[this.positionList.length];
        this.lessonsService.putLessons(lesson.lessonName, lesson.video_url,this.idCourse, newPosition).subscribe((data: any) =>{
          console.log(data);
      });
      
      }
    }
    if(name && position && videoUrl && this.idCourse) {
    this.lessonsService.postLessons(name,videoUrl,this.idCourse , Number(position)).subscribe((data: any) => {
      console.log(data);
      this.msg.success("Đã tạo thành công bài học " + name);
      this.getLessons();
      this.handleCancel();
    })
    }
  }
  findItemsByPosition(items: Lessons[], input: Number): Lessons {
    console.log(input);
    let index = ~~(input);
    console.log(items[index]);
    for(let item of items){
      if(item.position === index){
        return item;
      }
    }
    return items[index];
  }
  handleUpdate(id: number){

  }
}
