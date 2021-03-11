export const mockData = {
    playerConfig: {
      context: {
        mode: 'play',
        authToken: '',
        sid: '7283cf2e-d215-9944-b0c5-269489c6fa56',
        did: '3c0a3724311fe944dec5df559cc4e006',
        uid: 'anonymous',
        channel: '505c7c48ac6dc1edc9b08f21db5a571d',
        pdata: { id: 'prod.diksha.portal', ver: '3.2.12', pid: 'sunbird-portal.contentplayer' },
        contextRollup: { l1: '505c7c48ac6dc1edc9b08f21db5a571d' },
        tags: [
          ''
        ],
        cdata: [],
        timeDiff: 0,
        objectRollup: {},
        host: '',
        endpoint: '',
        userData: {
          firstName: 'Diptesh Mukherjee',
          lastName: 'Gangula'
        },
        // if the dispatcher is provided then player won't send the event to backend container need to send it
        dispatcher: {
          dispatch: function (event) {
            console.log(`Events from dispatcher: ${JSON.stringify(event)}`)
          }
        }
      },
      config: {
        traceId: '123456'
      },
      // tslint:disable-next-line:max-line-length
      metadata: { "compatibilityLevel": 4, "copyright": "Kendriya_Vidyalaya,2020", "keywords": ["epub"], "subject": ["Science"], "channel": "diksha", "language": ["English"], "mimeType": "application/epub", "objectType": "Content", "gradeLevel": ["Class 10"], "appIcon": "https://drive.google.com/uc?export=download&id=1z2kHz_wfjcOcDKfenkxWwqIlwtro6uv0", "primaryCategory": "Course Assessment", "artifactUrl": "https://sunbirdstagingpublic.blob.core.windows.net/sunbird-content-staging/content/do_21312960731822489612047/artifact/index.epub", "contentType": "SelfAssess", "identifier": "do_21312960731822489612047", "audience": ["Student"], "visibility": "Default", "mediaType": "content", "osId": "org.ekstep.quiz.app", "languageCode": ["en"], "license": "CC BY 4.0", "name": "EPUB_229.epub", "attributions": ["kanmani"], "status": "Live", "code": "49f3ea6d-db45-a4a7-fcd6-daf58785c7db", "description": "epub", "streamingUrl": "https://sunbirdstagingpublic.blob.core.windows.net/sunbird-content-staging/content/do_21312960731822489612047/artifact/index.epub", "medium": ["English"], "createdOn": "2020-10-15T04:14:28.339+0000", "lastUpdatedOn": "2020-10-15T04:19:30.101+0000", "originData": { "identifier": "do_21312917869280460814945", "repository": "https://dock.preprod.ntp.net.in/api/content/v1/read/do_21312917869280460814945" }, "creator": "classmate2", "pkgVersion": 1, "versionKey": "1602735570101", "framework": "ekstep_ncert_k-12", "createdBy": "7ff59e4d-0f4f-4f25-8244-969423e91a16", "board": "CBSE", "resourceType": "Learn", "orgDetails": {}, "licenseDetails": { "name": "CC BY 4.0", "url": "https://creativecommons.org/licenses/by/4.0/legalcode", "description": "For details see below:" } },
      data: {}
    },
    spineEvent: {
      items: [
        {
          'index': 0
        }
      ]
    },
    endEvent :{
        type: "END",
        data: {
          index: 26,
          href: "OEBPS/chapter-020-the-end-of-the-middle-ages.html",
          cfi: "epubcfi(/6/54[chapter-020]!/4/2[the-end-of-the-middle-ages]/2/2/1:0)",
          displayed: {
            page: 1,
            total: 0
          },
          location: -1,
          percentage: 0
        }
    },
    heartBeatEvent: {
        type: "pageChange",
        data: {
          index: 1,
          href: "OEBPS/title-page.html",
          cfi: "epubcfi(/6/4[title-page]!/4/2[title-page]/2/1:0)",
          displayed: {
            page: 1,
            total: 0
          },
          location: -1,
          percentage: 0
        }
    },
    assessEvent : {
      item: 'questionData',
      index: 'index',
      pass: 'pass', 
      score: 'score', 
      resvalues: 'resValues', 
      duration: 'duration' 
}
  }