import { NextContent } from "@project-sunbird/sunbird-player-sdk-v9";
import { LifeCycle } from "./Lifecycle";
import { Context } from "./Telemetry";

export interface Config {
  traceId?: string;
  sideMenu?: {
    enable?: boolean;
    showShare?: boolean;
    showDownload?: boolean;
    showReplay?: boolean;
    showExit?: boolean;
  };
  progressBar?: any[];
  questions?: any[];
  lastQuestionId?: string;
  duration?: number;
  nextContent?: NextContent;
}

export interface QumlPlayerConfig {
  context: Context; //TODO: Query - why is the telemetry context defined here?
  metadata: any; //TODO: define metadata interface
  config: Config;
  data?: any; //TODO: define data interface
}

export interface Question {
  code: string;
  templateId: string;
  name: string;
  body: string;
  responseDeclaration: any;
  interactionTypes: Array<string>;
  interactions: any;
  editorState: any;
  status: string;
  media: Array<any>;
  qType: string;
  mimeType: string;
  primaryCategory: string;
  solutions: any;

  //LifeCycle Hooks
  lifeCycle?: LifeCycle;
}

// QuestionSet

export interface IParentConfig {
  loadScoreBoard: boolean;
  requiresSubmit: boolean;
  isFirstSection: boolean;
  isSectionsAvailable: boolean;
  isReplayed: boolean;
  identifier: string;
  contentName: string;
  baseUrl: string;
  instructions: any;
  questionCount: number;
}
