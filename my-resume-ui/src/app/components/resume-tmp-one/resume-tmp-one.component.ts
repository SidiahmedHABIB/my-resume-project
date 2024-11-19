import { Component, Input } from '@angular/core';
import { Resume } from '../../models/resume.model';

@Component({
  selector: 'app-resume-tmp-one',
  templateUrl: './resume-tmp-one.component.html',
  styleUrl: './resume-tmp-one.component.css',
})
export class ResumeTmpOneComponent {
  @Input() resume: Resume | undefined;
  // @Input() generatePDF: () => void = () => {};
}
