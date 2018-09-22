import {
  Component,
  OnInit,
  Input,
  OnDestroy
} from '@angular/core';
import {
  Post
} from '../post.model';
import {
  PostsService
} from '../post.service';
import {
  Subscription
} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  /*posts = [
    {title: "First Post:", content: "Content of the first post"},
    {title: "Second Post:", content: "Content of the second post"},
    {title: "Third Post:", content: "Content of the third post"}
  ];*/
  //@Input()
  posts: Post[] = [];
  private postsSub: Subscription;
  isLoading = false;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    //this.posts =
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  onDelete(id: string) {
    this.postsService.deletePost(id);
  }
}
