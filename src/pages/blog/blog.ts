import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
    selector: 'page-blog',
    templateUrl: 'blog.html',
})
export class BlogPage implements OnInit, OnDestroy {

    public articles: any[];
    public filtredArticles: any[];
    private unsubscribe = new Subject<void>();

    constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider) {
    }

    ngOnInit(): void {
        this.getAllActivatedArticles();
    }

    getAllActivatedArticles() {
        this.databaseProvider.getAllActivatedArticles().takeUntil(this.unsubscribe).subscribe(response => {
            if (response != 'Not found') {
                this.articles = response;
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

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
