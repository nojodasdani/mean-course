import {
  Component,
  EventEmitter,
  Output,
  OnInit
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
import {
  ActivatedRoute,
  ParamMap
} from "@angular/router";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  //@Output() postCreated = new EventEmitter < Post > ();
  private mode = 'create';
  private postId: string;
  post: Post;
  isLoading = false;

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = "edit";
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          }
        });
      } else {
        this.mode = 'create';
        this.postId = null;
        this.post = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const title = form.value.title;
    const content = form.value.content;
    if (this.mode === 'create') {
      const post: Post = {
        id: null,
        title: title,
        content: content
      }
      this.postsService.addPost(post);
    } else {
      this.postsService.updatePost(this.postId, title, content);
    }
    form.resetForm();
    //this.postCreated.emit(post);
  }
}
