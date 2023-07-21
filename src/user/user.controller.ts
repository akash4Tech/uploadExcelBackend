import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { REQUEST } from '@nestjs/core';
import { log } from 'console';
import {  Request,Response} from "express";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('insert')
   async create(@Req() req:Request , @Res() res:Response,  @Body() uploadData:any ) {
    console.log(uploadData,"data frm frontend ");

    try {
      await this.userService.insert(uploadData);
      console.log("wwwwwwwwwwwww",uploadData);
      
      res.status(HttpStatus.OK).json({
        message:"Excel data inserted succesfully"
      })


      
    } catch (error) {

      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message:"404 Error unprocessed "
      })
      
    }
    





  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
