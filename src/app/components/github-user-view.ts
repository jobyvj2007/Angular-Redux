import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Github } from '../models/github';


@Component({
  selector: 'bc-github-user-view',
  template: `
    <a (click)="addUserToList.emit(github)">
      <md-card>
        <md-card-title-group>
          <img md-card-sm-image *ngIf="avatar" [src]="avatar"/>
          <md-card-title>{{ login | bcEllipsis:35 }}</md-card-title>
        </md-card-title-group>
        <md-card-content>
          <p *ngIf="type">{{ type }}</p>
        </md-card-content>
        <md-card-content>
          <p *ngIf="score">{{ score }}</p>
        </md-card-content>
      </md-card>
    </a>
  `,
  styles: [`
    md-card {
      width: 400px;
      height: 300px;
      margin: 15px;
    }
    @media only screen and (max-width: 768px) {
      md-card {
        margin: 15px 0 !important;
      }
    }
    md-card:hover {
      box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, .5);
    }
    md-card-title {
      margin-right: 10px;
    }
    md-card-title-group {
      margin: 0;
    }
    a {
      color: inherit;
      text-decoration: none;
      cursor: pointer;
    }
    img {
      width: 60px;
      min-width: 60px;
      margin-left: 5px;
    }
    md-card-content {
      margin-top: 15px;
      margin: 15px 0 0;
    }
    span {
      display: inline-block;
      font-size: 13px;
    }
    md-card-footer {
      padding: 0 25px 25px;
    }
  `]
})
export class GithubUserPreviewComponent {

  @Input() github: Github;
  @Output() addUserToList = new EventEmitter<Github>();
  
  get id() {
    return this.github.id;
  }

  get login() {
    return this.github.login;
  }

  get avatar() {
    return this.github.avatar_url;
  }

  get type() {
    return this.github.type;
  }

  get score() {
    return this.github.score;
  }
}
