import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDTO } from "src/dtos/CreateUserDTO";
import { LogInDTO } from "src/dtos/LogInDTO";
import { AuthLoginResponse } from "src/responses/AuthLoginResponses";
import { CreateUserResponse } from "src/responses/CreateUserResponse";
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
  //@UseGuards(LocalAuthGuard)
  @Post('/login')
  async login (@Body() dto: LogInDTO) {
    console.log('iam here');
    return await this.authService.login(dto);
  }

  @ApiOkResponse({
    type: CreateUserResponse
  })
  @Post('/registrate')
  async signIn(@Body() dto: CreateUserDTO) {
    return await this.authService.signIn(dto);
  }
}
