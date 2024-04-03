import { Injectable } from "@angular/core";

// models
import { Diskover } from "./models/diskover.model";

@Injectable()
export class AppGlobals {
  public diskover!: Diskover;
}