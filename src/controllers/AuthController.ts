import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiProperty, ApiTags } from "@nestjs/swagger";
import { CreateUserDTO } from "src/dtos/CreateUserDTO";
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
  @UseGuards(LocalAuthGuard)
  @ApiProperty({
    description: 'Log in user'
  })
  @Post('/login')
  async login (@Request() req) {
    return await this.authService.login(req.user);
  }

  @ApiOkResponse()
  @ApiProperty({
    description: 'Registrate user'
  })
  @Post('/registrate')
  async signIn(@Body() dto: CreateUserDTO) {
    return await this.authService.signIn(dto);
  }
}
