import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
    selector: 'page-blog',
    templateUrl: 'blog.html',
})
export class BlogPage {

    public articles: any[];
    public filtredArticles: any[];

    constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider) {
    }

    ngOnInit(): void {
        this.getAllActivatedArticles();
    }

    getAllActivatedArticles() {
        this.databaseProvider.getAllActivatedArticles().subscribe(res => {
            if (res != '0') {
                this.articles = res;
                this.filtredArticles = this.articles
            }
            else {
                console.log("No article FOUND");
            }
        });
    }

    getArticles(ev: any) {
        this.filtredArticles = this.articles;
        let val = ev.target.value;
        if (val && val.trim() != '') {
            this.filtredArticles = this.filtredArticles.filter((item) => {
                return (item.titre.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

}
