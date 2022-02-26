import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationProvider } from './auth';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthenticationProvider) {}


    @Get('login')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {}

    @Get('status')
    status() {
        return;
    }

    @Get('redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        return this.authService.googleLogin(req)
    }

}
