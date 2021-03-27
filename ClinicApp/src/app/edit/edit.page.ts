import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'; 
import { ActivatedRoute } from '@angular/router'; 
import { LoadingController, NavController, ToastController } from '@ionic/angular'; 
import { Post } from '../models/post.mode';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  post = {} as Post; 
  id: any;

  constructor(
    private actRoute: ActivatedRoute, 
    private loadingCtrl: LoadingController, 
    private firestore: AngularFirestore, 
    private toastCtrl: ToastController, 
    private navCtrl: NavController) 
    {
      this.id = this.actRoute.snapshot.paramMap.get("id");
    }

  ngOnInit() 
  {
    this.getPostById(this.id);
  }

  async getPostById(id: string)
  { 
    let loader = this.loadingCtrl.create
    ({ 
      message: "Please wait..." 
    }); 
    (await loader).present();

    this.firestore.doc("contact/" + id) 
    .valueChanges() 
    .subscribe(data => 
      { 
        this.post.name = data["name"]; 
        this.post.email = data["email"];
        this.post.enquiry = data["enquiry"]; 
        this.post.message = data["message"]; 
      });

      (await loader).dismiss(); 
  }

  async updatePost(post: Post)
  { 
    if(this.formValidation()) 
    { 
      let loader = this.loadingCtrl.create
      ({ message: "Please wait..." }); 
      (await loader).present();

      try
      { 
        await this.firestore.doc("contact/" + this.id).update(post); 
      }

      catch(e)
      {
        this.showToast(e); 
      }

      (await loader).dismiss();

      this.navCtrl.navigateRoot("view-post"); 
    }
  }

  formValidation()
  {
    if(!this.post.name)
    { 
      this.showToast("Enter name"); 
      return false; 
    }

    if(!this.post.email)
    { 
      this.showToast("Enter email"); 
      return false; 
    }

    if(!this.post.enquiry)
    { 
      this.showToast("Enter enquiry"); 
      return false; 
    }

    if(!this.post.message)
    { 
      this.showToast("Enter message"); 
      return false; 
    }

    return true;
  }

  showToast (message:string)
  { 
    this.toastCtrl.create
    ({ message: message, duration: 3000 }) 
    .then(toastData => toastData.present()); 
  }

}