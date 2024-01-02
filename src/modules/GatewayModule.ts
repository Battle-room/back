import { Module } from "@nestjs/common";
import { Gateway } from "src/gateway/Gateway";


@Module({
  providers: [Gateway]
})
export class GatewayModule {}