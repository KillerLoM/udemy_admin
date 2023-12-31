import { Component, ElementRef, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzUploadBtnComponent } from 'ng-zorro-antd/upload';
import { Courses } from 'src/app/Model/courses';
import { ShareService } from 'src/app/Service/share.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent {
  displayedColumns = ['id', 'title', 'subtitle', 'avatar'];
  isHidden = true;
  clickedRows = new Set<Courses>();
  current = 0;
  listCourse: Courses[];
  index = 'First-content';
  constructor(
    @Inject(ShareService) private shareService: ShareService,
    private el: ElementRef){
      this.listCourse = this.shareService.getCourses();
    }
  pre(): void {
    this.current = this.current - 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    this.current = 0;
    this.changeContent();
    console.log('done');
  }

  changeContent(): void {
    console.log(this.current);
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        this.toggleHidden(true)
        break;
      }
      case 1: {
        this.toggleHidden(false)
        this.index = 'Second-content';
     
        break;
      }
      case 2: {
        this.toggleHidden(true)
        this.index = 'Third-content';
       
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }
handleLessons(element: Courses): void {
  this.shareService.setIdCourse(element.id);
  this.clickedRows.add(element);
  let btn = document.getElementById("next-process") as HTMLButtonElement;
  if(btn){
      btn.click();
  }
}
  toggleHidden(status: boolean): void {
    const nextButton = this.el.nativeElement.querySelector('#next-process') as HTMLButtonElement;
    nextButton.hidden = status;
  }
}
