import { Component, OnInit } from '@angular/core';
import { Parcel } from 'src/app/models/parcel';
import { Post } from 'src/app/models/post';
import { ParcelService } from 'src/app/services/parcel.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-parcel',
  templateUrl: './parcel.component.html',
  styleUrls: ['./parcel.component.css'],
})
export class ParcelComponent implements OnInit {
  private parcelService: ParcelService;
  private postService: PostService;

  public parcels: Parcel[] = [];
  public posts: Post[] = [];

  public id: number;
  public weight: number;
  public phoneNo: string;
  public info: string;
  public postId: number;
  public postTown: string;
  public editMode: boolean = false;
  public filteredByPostCode: number;

  constructor(parcelService: ParcelService, postService: PostService) {
    this.parcelService = parcelService;
    this.postService = postService;
  }

  ngOnInit(): void {
    this.parcelService.getAllParcels().subscribe((parcelFromApi) => {
      this.parcels = parcelFromApi;
      this.parcels.sort((a, b) => b.weight - a.weight);
    });
    this.postService.getAllPosts().subscribe((postFromApi) => {
      this.posts = postFromApi;
      this.posts.sort((a, b) => a.postCode.localeCompare(b.postCode));
      for (let i = 0; i < this.parcels.length; i++) {
        const pp = this.parcels[i];
        const selectedPost = this.posts.filter((p) => p.id == pp.postId)[0];

        pp.postCode = selectedPost.postCode;
      }
    });
  }
  public addParcel() {
    var newParcel: Parcel = {
      id: this.id,
      weight: this.weight,
      phoneNo: this.phoneNo,
      info: this.info,
      postId: this.postId,
    };
    this.parcelService.addParcel(newParcel).subscribe((parcelId) => {
      newParcel.id = parcelId;
      this.parcels.push(newParcel);
      this.clearForm();
    });
  }
  public clearForm() {
    this.weight = 0;
    this.phoneNo = '';
    this.info = '';
    this.postId = null;
  }
  public updateParcel(parcel: Parcel): void {
    this.editMode = true;

    this.id = parcel.id;
    this.weight = parcel.weight;
    this.phoneNo = parcel.phoneNo;
    this.info = parcel.info;
    this.postId = parcel.postId;
  }
  public sendUpdatedParcel() {
    var updatedParcel: Parcel = {
      id: this.id,
      weight: this.weight,
      phoneNo: this.phoneNo,
      info: this.info,
      postId: this.postId,
    };
    this.parcelService.updateParcel(updatedParcel).subscribe(() => {
      (this.parcels = this.parcels.map((b) =>
        b.id !== updatedParcel.id ? b : updatedParcel
      )).sort((a, b) => b.weight - a.weight);
    });
    this.editMode = false;
    this.clearForm();
  }
  public deleteParcel(id: number): void {
    this.parcelService.deleteParcel(id).subscribe(() => {
      this.parcels = this.parcels.filter((h) => h.id !== id);
    });
  }
  public getAllParcelsByPost(id: number): void {
    this.parcelService.getAllParcels().subscribe((parcelFromApi) => {
      this.parcels = parcelFromApi;

      if (id == 0) {
        this.ngOnInit();
      }
      this.parcels = this.parcels.filter((b) => b.postId == id);

      this.postService.getAllPosts().subscribe((postFromApi) => {
        this.posts = postFromApi;
        this.posts.sort((a, b) => a.town.localeCompare(b.town));
        for (let i = 0; i < this.parcels.length; i++) {
          const pp = this.parcels[i];
          const selectedPost = this.posts.filter((p) => p.id == pp.postId)[0];

          pp.postCode = selectedPost.postCode;
        }
      });
    });
  }
}
