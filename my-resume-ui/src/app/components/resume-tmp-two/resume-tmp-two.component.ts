import { Component, Input } from '@angular/core';
import { Resume } from '../../models/resume.model';

@Component({
  selector: 'app-resume-tmp-two',
  templateUrl: './resume-tmp-two.component.html',
  styleUrl: './resume-tmp-two.component.css',
})
export class ResumeTmpTwoComponent {
  @Input() resume: Resume | undefined;
}
