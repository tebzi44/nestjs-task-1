import { Body, Controller, Get, Post , Delete } from "@nestjs/common";
import { Param, Request, UseGuards } from "@nestjs/common/decorators";
import { AuthGuard } from "@nestjs/passport";
import { NewsService } from "./news.service";
import { News } from "./newsEntity/news.entity";



@Controller('news')
export class NewsController {
    constructor( private newsService: NewsService ) {}


    @Get()
    getAllNews():Promise<News[]> {
        return this.newsService.getAllNews()
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('my-news')
    async getMyNews(@Request() req:any):Promise<News[]> {
        return await this.newsService.getMyNews(req)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('change-news/:id')
    changeMyNews(
        @Request() req:any,
        @Param('id') newsId:number, 
        @Body('text') text: string
        ):Promise<News> {

        return this.newsService.changeMyNews(req, newsId, text)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('')
    createNews(@Request() req:any,  @Body('text') text: string ):Promise<any> {
        return this.newsService.createNews( req, text )
    }

    // @Delete('delete-news/:id')
    // deleteNews(@Request() req: any, @Param('id') id: number) {
    //     return this.newsService.deleteNews(req, id)
    // }
}
