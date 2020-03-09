import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router'
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment.prod';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  angForm: FormGroup;
  errorMsg: boolean = false;
  hasBaseDropZoneOver:boolean;
  hasAnotherDropZoneOver:boolean;
  response:string;
  isLoadingResults:boolean = true;
  public uploader:FileUploader = new FileUploader({
    url: `${environment.api}`+"/file_uploads",
    // headers: [
    //   { name: 'Accept', value: 'multipart/form-data' }
    // ],
    itemAlias: 'photo'
  });

  constructor(private fb: FormBuilder, private router: Router, private _book: BookService) { }

  ngOnInit() {
  	console.log("create");
  	this.angForm = this.fb.group({
      title: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      isbn: new FormControl('', Validators.compose([Validators.required])),
      book_image:  new FormControl('')
    });

    // this.uploader = new FileUploader({
    //   url: `${environment.api}`+"/file_uploads",
    //   disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
    //   formatDataFunctionIsAsync: true,
    //   itemAlias: 'image',
    //   formatDataFunction: async (item) => {
    //     return new Promise( (resolve, reject) => {
    //       resolve({
    //         name: item._file.name,
    //         length: item._file.size,
    //         contentType: item._file.type,
    //         date: new Date()
    //       });
    //     });
    //   }
    // });
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;
    this.response = '';
    //this.uploader.response.subscribe( res => this.response = res );

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
      // this.uploader.options.additionalParameter = {
      //   version: this.angForm.get('version_number').value,
      // };
    }

    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      //form.append('version_name', this.angForm.get('version_number').value); 
    };

    this.uploader.response.subscribe( (res) => { 
      res = JSON.parse(res);
      //console.log(res.path)console.log(res.filename)
      this.angForm.controls['book_image'].setValue(res.filename)
    } );
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      //console.log('***** onAfterAddingFile ******')
     //console.log('file ', file)
    }
    this.uploader.onCompleteItem =  (item:any, response:any, status:any, headers:any) => {
      //console.log('ImageUpload:uploaded:', item, status, response);
    };
    this.uploader.onCompleteAll = () => {
      //console.log('******* onCompleteAll *********')
    }
    this.uploader.onWhenAddingFileFailed = (item: any, filter: any, options: any) => {
      //console.log('***** onWhenAddingFileFailed ********')
    }
  }

  validation_messages = {
    'title': [
      { type: 'required', message: '* Title is required.' },
    ],
    'description': [
      { type: 'required', message: '* Description is required.' }
    ],
    'isbn': [
      { type: 'required', message: '* ISBN is required.' }
    ]
  }
  
  onSubmit(data){
  	console.log(data);
    this.isLoadingResults = true;
    this._book.addBook(data)
    .subscribe(res => {
        console.log(res)
        //let id = res['_id'];
        this.isLoadingResults = false;
        //this.router.navigate(['/product-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  alertclose(){
    this.errorMsg = false;
  }


  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  public onFileSelected(event: EventEmitter<File[]>, image) {
    const file: File = event[0];
    //this.image_url = image;
  }
}
