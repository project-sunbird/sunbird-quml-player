export interface Context {
    mode: string;
    authToken?: string;
    sid: string;
    did: string;
    uid: string;
    channel: string;
    pdata: Pdata;
    contextRollup: ContextRollup;
    tags: string[];
    cdata?: Cdata[];
    timeDiff?: number;
    objectRollup?: ObjectRollup;
    host?: string;
    endpoint?: string;
    userData?: {
        firstName: string;
        lastName: string;
    };
}
export interface Pdata {
    id: string;
    pid: string;
    ver: string;
}

export interface ContextRollup {
    l1?: string;
    l2?: string;
    l3?: string;
    l4?: string;
}

export interface Cdata {
    type: string;
    id: string;
}

export interface ObjectRollup {
    l1?: string;
    l2?: string;
    l3?: string;
    l4?: string;
}

export interface QumlPlayerConfig {
    context: Context;
    metadata: any;
    data: any;
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
    status: string,
    media: Array<any>,
    qType: string;
    mimeType: string;
    primaryCategory: string;
    solutions:any;
}
