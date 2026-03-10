import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {

    async getBooks() {
        return [
            {
                name: "jhjuhl;",
                year: 1247
            },
            {
                name: "juhi;",
                year: 1207
            }
        ]
    }
}
