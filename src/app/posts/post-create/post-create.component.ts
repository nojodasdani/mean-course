import {
  Component,
  EventEmitter,
  Output
} from "@angular/core";
import {
  NgForm
} from "@angular/forms";
import {
  Post
} from '../post.model';
import {
  PostsService
} from "../post.service";
import { NullTemplateVisitor } from "@angular/compiler";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  constructor(public postsService: PostsService) {

  }
  
  enteredTitle = "";
  enteredContent = "";
  //@Output() postCreated = new EventEmitter < Post > ();

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: Post = {
      id: null,
      title: form.value.title,
      content: form.value.content
    }
    this.postsService.addPost(post);
    form.resetForm();
    //this.postCreated.emit(post);
  }
}
