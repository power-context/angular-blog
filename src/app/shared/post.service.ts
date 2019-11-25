import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post, FbCreateResponce } from './interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class PostService {
    constructor(private http: HttpClient){}

    create(post: Post): Observable<Post>{
        return this.http.post<Post | any>(`${environment.fbDbUrl}/posts.json`, post)
            .pipe(map((responce: FbCreateResponce) => {
                return {
                    ...post,
                    id: responce.name,
                    date: new Date(post.date)
                }
            }))
    }

    getAll(): Observable<Post[]>{
        return this.http.get(`${environment.fbDbUrl}/posts.json`)
        .pipe(map((responce: {[key: string]: any})=>{
            return Object
                .keys(responce)
                .map(key=>({
                    ...responce[key],
                    id: key,
                    date: new Date(responce[key].date)
                }))
        }))
    }

    remove(id: string): Observable<void>{
        return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
    }
}