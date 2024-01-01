import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserDTO } from "src/dtos/CreateUserDTO";
import { AuthLoginResponse } from "src/responses/AuthLoginResponses";
import { AuthRefreshResponse } from "src/responses/AuthRefreshResponse";
import { JwtGuard } from "src/security/JwtGuard";
import { LocalAuthGuard } from "src/security/LocalAuthGuard";
import { AuthService } from "src/services/AuthService";


@ApiTags('Auth')
@Controller({
  path: 'auth'
})
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}
  
  @ApiOkResponse({
    type: AuthLoginResponse,
  })
  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: 'Log in user'
  })
  @Post('/login')
  async login (@Request() req) {
    return await this.authService.login(req.user);
  }

  @ApiOkResponse()
  @ApiOperation({
    summary: 'Registrate user'
  })
  @Post('/registrate')
  async signIn(@Body() dto: CreateUserDTO) {
    return await this.authService.signIn(dto);
  }

  @ApiOkResponse({
    type: AuthRefreshResponse,
  })
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Refresh access token'
  })
  @Post('/refresh')
  async refresh (@Request() req) {
    return this.authService.refresh(req.user);
  }
}
