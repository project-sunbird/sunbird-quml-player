export const responseDeclaration = {
    maxScore: 1,
    response1: {
        cardinality: "single",
        type: "integer",
        correctResponse: {
            value: 1,
            outcomes: {
                SCORE: 1
            }
        }
    }
}

export const options = [{
    label: "<p>2 September 1929</p>",
    value: 0
},
{
    label: "<p>15 October 1931</p>",
    value: 1
},
{
    label: "<p>15 August 1923</p>",
    value: 2
},
{
    label: "<p>29 February 1936</p>",
    value: 3
}];

export const selectedOptions = [{
    label: "<p>2 September 1929</p>",
    value: 0
},
{
    label: "<p>15 October 1931</p>",
    value: 1
},
];


export const questions = [
    {
        "code": "29768037-4c37-a10f-8823-5218826db206",
        "templateId": "mcq-grid-split",
        "name": "untitled mcq",
        "body": "<div class='question-body'><div class='mcq-title'><p>1. What does ...... a dummy-variable regression analysis examine?</p><p><br data-cke-filler=\"true\"></p><figure class=\"image\"><img src=\"data:image/png;base64,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\" data-mathtext=\"A%3D%5Cpi%20r%5E2\" advanced=\"false\"></figure></div><div data-choice-interaction='response1' class='mcq-vertical'></div></div>",
        "responseDeclaration": {
            "maxScore": 1,
            "response1": {
                "cardinality": "single",
                "type": "integer",
                "correctResponse": {
                    "value": "1",
                    "outcomes": {
                        "SCORE": 1
                    }
                }
            }
        },
        "interactionTypes": [
            "choice"
        ],
        "interactions": {
            "response1": {
                "type": "choice",
                "options": [{
                    "label": "<p>2 September 1929</p>",
                    "value": 0
                },
                {
                    "label": "<p>15 October 1931</p>",
                    "value": 1
                },
                {
                    "label": "<p>15 August 1923</p>",
                    "value": 2
                },
                {
                    "label": "<p>29 February 1936</p>",
                    "value": 3
                }
                ]
            }
        },
        "editorState": {
            "question": "<p>1. What does a dummy-variable regression analysis examine?</p><p><br data-cke-filler=\"true\"></p><figure class=\"image\"><img src=\"data:image/png;base64,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\" data-mathtext=\"A%3D%5Cpi%20r%5E2\" advanced=\"false\"></figure>",
            "options": [
                {
                    "answer": false,
                    "value": {
                        "body": "<ol><li>The relationship between one continuous dependent and one continuous independent variable</li></ol>",
                        "value": 0
                    }
                },
                {
                    "answer": true,
                    "value": {
                        "body": "<ol><li>The relationship between one categorical dependent and one continuous independent variable</li></ol>",
                        "value": 1
                    }
                },
                {
                    "answer": false,
                    "value": {
                        "body": "<ol><li>The relationship between one continuous dependent and one categorical independent variable</li></ol><figure class=\"image\"><img src=\"https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/do_11310507846892748812026/artifact/icon.png\" alt=\"do_11310507846892748812026\" data-asset-variable=\"do_11310507846892748812026\"></figure>",
                        "value": 2
                    }
                },
                {
                    "answer": false,
                    "value": {
                        "body": "<ol><li>The relationship between one continuous dependent and one dichotomous variable</li></ol><figure class=\"image\"><img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcUAAABzCAYAAADpJRlYAAAABmJLR0QA/wD/AP+gvaeTAAAeN0lEQVR4nO2dabgcVbWG35NzQhJISAghBIhJECQQJpnHAMqojMqoiIhwFbig6FVkEhkElfECMiMXBAEBQUEEBSOTCRERImhAhDCFeUwISfDk9P3xVbF3Vap6Ot1V1d3rfZ56Tp3au6tXV3fVntb6FhiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGUTRGA7cCs4HbgE8Ex4cDJwMzgFeAvwCHAwNysNEwDMMwmk4XMB04GzgYKAHPAesCs4Arge2BDYAHg/Jj8jDUMAzDMJrN9qgR7AHGo0avBLwHfD5W96CgbGaG9hlGx2JTMoaRPQcANwG9wOre8Z8At8TqLh38XSYDuwyj47FG0TCyZwBwfbC/VfD3OdQoxlkj+PtMk20yDMMwjNwJ1wyvSCl/NihPajANwzAMo20YAixAjd4BCeXr4NYbN83QLsMwDMPInE/hGr3xCeUnBmUvY0sdhpEJdqMZRn5MDv4+CzyfUL538PcmoA95q54PjGy+aYZhGIaRLb9HI8FLE8om4kaRmwXHdkQOOdaZNQzDMNqKbhSXWAL2Sig/MCh7BwX7dwH3AidkZJ9hGIZhZMZ6qNHrJXk6dMug/F/ACDRt+ghyzjEMwzCMtmIb1CBeXabOqcAcYCGKa1y2+WYZhmEYRj4MqrLewKZaYRiGYRhGriwNXIAchx4HzmLxkfB4lDHkIeAl5KF7J/AFtMZqGIZhGC3PUsDfgHeB64D3ceuno1CD9z3gg6DsAeAa1HiGHrk3YA2jYRiG0QacDixCzkQAF+Iaux8DPwvKzyA6ehwIPOHV3Scjew3DMAyjKQwB3gR+5R07BdfQ9QIfAl9Mef3/enWvbZ6ZRqfSk7cBhmF0FJ9Do7+fe8cmePvdwHFoWjUJ/5k1uqGWGYZhGEbG3AjMR+uKIc/hRn/3UV6x5x6i64qG0VBspGgY9dMDDMvbiBqYh6Ym8+Q14OzAFtAo0RdDPwnpvKYxydt/opGGGYZhGNUzDzdCadXtnIZflf4TytmVUBqtwWXqfpLo59mi6dYZHYeNFA2jOt4HlixTPgs9qBvFMNz96e/3h4NQOqr3G3CuRrGVt/8QahjT2M3bfy2o30kMRCEro4CnKX+tDMcA3HV7FXg7X3MMoz3YBU3rpY3CvpGBDd3A8mgKcSvUyJ2OUks9X8Y2fzs8Aztr4d84206qUPevXt2kzCLtyhlI7s//HpPybxpRvowE9f3rtnuuFhlGm+GHA8S3BWh6L0/GIrWXW9DaYZKdMylO0PtKRG37dJm644h2Sj7TdOuKww7A8cBT6LMn5d40FmcD4DtI/KGEfj+mH2wYDWQQUmJJaxhnEvWqzJPRwLFINSZu5w452uWzL9FORbkMIP/j1X2LqB7sSGDFJtlYJP6AxWfWwxnoupljlmE0gYnAXNIbxp/lZ1oio4HLiY6yfpurRY7zcTZNqVB3ulf3sljZ08CfG25dsVgCJ4f39ZxtaTXCafeL8zbEMNqVgyi/bpemxpIne+Meqn2occ8bf9R9XJl6Y4k26v4060Zkt6abJ5Nxn39ShbqGYzhSSSrqfWkYbcMvSG8U3wVWzs+0VNYDXkc2npezLcNwD6sSatzS2M+r9x5yOAq5CU29tvta0Yno879BcdaEW4HdcL+djzXjDXYHXkG9TqMYbI7WWP47b0M6jKE4x4ek7S9oyqtobIEakTmoF10Pw4DbgIep/wG9A+5avUl5FZuveXX9adbQI/jMOm0ANbD/Qo1ruZCbvJmCPv+teRvSYpyLrtusZpx8b9SzuxHrqRSNcG3m2Dpeuy3wT9TZuRj3YFgP+CXwMooJuxfYrr+Gthkbk+7lWQJ+lJ9pZTka2ffNOl47FK3fzQc27IcNJ+Ou040V6q6MGvIS8AgwAjgUpZa6l/IB/9WwPfCf4FxFbBgHoc9aAr4VK9sPdcDeQDkps2Kd4H1fR99fqEP7ceAK5CH7ZlDnCxnaFSecor8qdnwykgx8A3U0au7A7oxu/pm0lqxVp9AN/I7km6Ycq6E4np2Bq4PXX45i2WYDR6HGcTIKeP2Q/j0I25GwgUnaFqFOR9EIUzA9TfkRWpzBuBHLf/XThvD3VgL2rKL+t9D1DF/Th0TFh/bTjpBDg/PejRqhIrEV7nOvHxzrRim37gF2RA5eJWCVDOwZgYLgv4rr3EwBdg2On4Q6jOuj31i133Ez7Ax/M1/1jh8BzAhsOgEN9mqy75M4zcS1GmGp0RRCtYZFVO9yfxHKfg5yVCgBC4EnWXz+/ZagvD9TVe3IAOD3pDeMLwPL5WZdOmug2Z9aOrnXos/UCCHuUWjKv5Z4w4moMT4EWLsBNsS5GX2+nzbh3P3h+7i16m40mr0dacgOQJ2D8PeWRazst4E7gv3P4jqAs4F1Y3XPJL9p311x12VVNMN5Frp2S6GOVlh+YLUn7QH+TjEW5o3KhHFfrwErVKg7EI3+Qv3Ii3DxYkkPnD8F5Z2kJFIto9H0c1rDeCetv+SwN/os85A3aDsyBt0TJWCvnG3xCTOD3IFiMh8AjvTKZwTlz5DNKPdRpBYDLn60DzWQcS4Pyv+YgV1xzgreezZ63v0cuATnqBXOVsylBse4w4MXvU37e3e1Cw+h76xSgO9YtBYQ/kD+QfnOz6tB+dENsLEd2ZHo9F58Oyo/0/rNYJy26w9ytqXZHIfrWC6dsy2gta5QjP464DG0juizJnpWV+oIN4IetFQzKvj/N4FtabGvfw7K47GlWRDGJ96LhA9OiZWPQbMVVYe4jMC5bx9ZoW6rMpRiLqz3h8/gem7Vrv8th4sD2zmhfD3cw32zBtjYroRTRUnbAtx6UKsRNhQvUhzFnmYxFDlflIAf5mwLaCbH/x1NBfagvPpPVgxAnu9pTlsjcI5oB6Sc4wXS75lqt6QYVT8+sYRydh5APwd3P8SNEovwBTSDKajX0050IRfzcr23OHsF9XvRDznOD4LyV6nNMaPTGAhMI/3mfZrWc1QbiWIDS8AxOduSFaEs2DxgmZxtOR73HD4FeBx3L+6Uo10QTeWVtJa5f1D2IfodJbE88ljtz5Y0ZbyzZ9upKHl1CQlYHFHTpwxYBncjXFjPCVqEx2jP9DPH4ha/J1RRPwzpeCSl/NGg3GSSKrMK7t5J2q7KzbL6CL0L/0Nn6IuCHHrCmZO8lXJCvdNfBf93oVCfEoo1zXNZK3TOe5vkzvJNQfndWRoVEHZsnvGOhSIQfcg7tibCtcQS7Z3Icwbt2SiuTLSXVIkwlufshLLVvHNtExxbt8rzdir7UH66Z//8TKuJbuSkkNeDLU/CjmCeItLduJRRvjjHONxvKcxHOQS4kmzXQW8MbPh1QtlQ3FroIcGxFcjOUW9q8N6Xx46H071+Z+cMtC5blvtxQ82BFeq2Mo/Tno0iuPigxyvU8+W2kqZjjsF5cIW9wUtQGiUjnatIbxTnos5G0fkUzubjc7Yla8KRRgn4RE42rO/Z4IfDresdXyM4thvKTZmll/PLgQ1J05HhksxC3NTpd8hGjH4wTuzhS97xbtyzLnRWGh/UHUUZBqMP0gm9wydo30YxDLEoUT4haSi3tYBkp6NbiU77jUOdJYtZLc9SSOwirWF8mGLKwPn4qjNb5mxL1myP++y1CGI0kiOD93+TaGMXOr4twq2n3YYC0bPi47jrkyQuHzqdPRj8PxR1rHfNwDZfPH2cd3wgWgYo4bR2T0XTvB/Rk3DC9XA369R+GNaDhvarIImiacCzsTrD0EN5GaQj+WBgcFYUyWlkDRRgOgK5Es/s5/n+6u1vR3pKo3B6fCr6nuI8Gfydg1yXr0PxP5abrDzz0DTqdJId1TZEjhNFdl4J110+RI14J+Gvr2+HNDSrZSRaahiNHGL+iGYHfFZBHY1F6DfydMJ5Ng/+hjN3IU8G5x2DZhw2RY4u9UzLrxnYMhxJsj1V5evCTtILKa8JnxvvoYbpchTrfHsdNtZK+EybhewL+Q8KEdkaPWuXRkuFm1MBP8q/Xs26A1g8mHkRcA1OlmlPJDHm15lGtoHBM8l3pNiF0hCFAgn+djP6oa6LHGEOrPHcG3jnuqRMvdORjmWazNFwNFr8AE2X5O140GqEzghJ2yI0IikiXbj1lycr1G1XwnCB16usPxTF+YYzbeH2Lm5NcCC6n/2Y1t7gWHfsfDei7yBJc3hz5BOxCDkM1qLw04VE1sPYZH+7Lvgc6yO1q7R0S4cEnzNtFN2DGsI5wWc4jeRBWDM4Dj2vkpIkrIw6KR+i7zcpBG0xbsBdoHLpXNI4BTc9tAsaZn8eTQGUUCDl7ujLvBM9vNfABYHesdgZm0eejeJy6POHD8czUK9vtWC/D43e/I5DLTqPQ3AedH+tUDd+MxqNows5IqQ1jK+hHn/RmIizsShJibMmvD8rLUGARh1T0T13ORplT0Q6oP407BXofv8Bute3wDkzHZxw3kr3Zq0NzRicQk4vaqxWBVZHfgIlpJgTOvgsIn2av8jPjbqvW1KBH93/TEJ5OfZBOn3nI/mf3uD4s+iin4aGrluixmjXoM7laKEYtLgfzv22K6NQb2Vt9Pl3JxovGarGfNc79jxay6uW+TglotUr1F1Uw3kbyWSco0AzCZXw8yB82G1A8izIaOD/cBqSRcH3xqv1OdAuvOTtT0T3YBqXou94F6L38kloNLIhWmfrRiFTP0Yd49/gQl12YPFljkr3Zm+Fcp/l0RTm6mik9Fmi8mtHoSUlX6zl6aBuEnk9N6qhkdftoxirWh7AoHnjt1GvMmmt7hCiPeRwTnrN2PH5Ka9vBnmMFAfh5IdKqPOQxAiiigy/qOO9/GnZIsr0PUn6CKqRWy8VvMsyYCui32d8S/sd5MVRONu+W6Fuu+I7GpXLCnJgUOeQlPI7vPO8hPPoP4Hob6ARQutpLInTSC2Rnn91NG6GqUS6L0LbEh8pDsfFucyr8VynBq8/Cl3UOBO8/VfRgicsrvBxXcrr24WfoB4lqAeeFtowB82Lh9fnzyn1yvGGtz8Oze0XiR2oLzThnRrrv4em7/PkfrR++/2U8h8hR7PpmVlUHj9LSq3PgnYhfv8kMQQtd8xAU6NJTPD2b8PNgsWfffV0fKvlHJQDETQYSBPieBeNDEOv1nqeO23FWFwPIe4pWo4ByLuqnGTaXd65r/OOd6GHxVS0SJ2lFmnWI8XNiPbCDi9T149FKrF4SpZq+K33+q3reL3RWAbg8hEmbf+mGCLU4LIblKjdyatd8Ge30jqvO1J+lLg00RkCP/vGCsih7l6i+f4azTZEf2fl3mvTWN2kcIu2Jj5S9F3Ha+kd9iFvqFfKvI/v9jrF2y8hb6H+Mp7F1eMrsSyKJ/teDa8poZi9aj3SfE7CxRv14aSbkpjs7c+hvhCIBd5+uwmftyJ9KOXOYyRPZ6+CPP6K0AjV+yzwuYn6OnON5nHqS3Lr3z9pQugPoJmfv6eUb45z+uhDDWDIK2STouokb/8/lF9f9587byId5Y5mEq6HkKaDWQ8bEe19NCM7dCicm8V2WB32+XJpJXQzleN6r+5ddbxf/Bx71HkOo/F8nvTf1kJgpfxM+4hf4mzarULdNKbTmPutv1sl7+s0fLm+n9d5jlCntIQ6Q1mzDtFrUUmQ5VavbpJ8W9sTHyn6PaNGZsbY1tt/geZ4s51J7Y3Hzcih6Cs1vKbeH/cusf9/U6G+ryBS77y+rx4/v85zGI3nFrSmE+9chdNwszO3aHH830u9z4KbaWznul7KeY2WY7C3nyRsUQ2f9vbzSLRby3Oni6jWdUeuJ8YbRf+Lb2TeNP+HcU8Dz+vzIbXfgAvQ1FAWN+4msf8fTKwlViHqvl+vspD/MKv3pjaaw7fR1Jo/vXgiErgoAn6jWO+z4MxGGJIj/W0Uh+Oc6kDhEFlTy3NnEgoTCemPolnLEm8Uw0DxLhrXKC5BdD0xjx9GEfCzYi8ifQ0CFKsZ0kv9Hon+OuLbdZ6jmexJfQIRtfIaLjC5KCxAiiVho3gFxUhqG+L/Xjp1Pdp/Btbq8QxycAnXE3uRB3LW+M+dhUjFJg3/ubOQYozyC0GofL6A2hTXe9ADblLs+NZE57TTFOcnojidWuSK+kuW3qcP465BJaeZa726/g9zaXSNNq3yPcNMGSWK49Xo48dNNXObT/5xinF2wokT30l2EljV8jXc9WuEI1wr4mfKOLBMveHIQWV07HjYEStRvhP8JZqXZzNMSlzN2urNXl1/6nQkWmPeIOlF7UbSjfg86l0MQgv+LyXUiTMcLeCGvf4vIicPiC7SzyN9PfFoYG+UXqQd8XuaSeK/Ptt4+/6P80vAvqTHQ8UJe4nvIg/WorEV2YgKvE/+cYo+a6HOTQ/qIO1HjQobGeCvw308NyvyxR9lvZBSZ0u0TjcSxcOuhjzTu4g++9IaxUFIYH9WvyxNp9rnzgCiYVv+c+cryOnogsaZ1VpchustbFPla04l2jMPY3q6cKK6JdJHZSuiOfusvZ2yHCmejbsO5UIx4glq/TCTP6EA/EEJr4uzrHeOKRXqGtmxEu6eeIlokHyRGIP7/XTqksd96PP3oUw+STxB9H4Nk/5uHDt+dOKrJQFYaSTaHy70bLi2TL0vE7XX91afhsJHijabkRn+tElaQGqc24le0FB5fJvY8ZsTXjsIXfQPqKzR2WiybBT9hK1paXgmIxEE/5pNCMrGoNHEhXW83+l1WWw0mqVxU8bv4RRGikooVP1i3obkQBdaVy2RnsZtCaJiHK/jlinOJ3ofJ2WbWBvd79Npnrj2Zzwb0tY0t0XPX9/eUKR+HPqMZzXJvpbAj2s5r8rXnBvUfwMX3jAaaVu+jEu2+iLRta0JqBfah9JNZU3WijZ3o+uwiGjIRRfKXj0Pzfu/jvsOVg3qnIc8bKvNAu5rV+7eX8ONfjMQ+AP6Pj6kuCmjfH6FGykVUTu3mYzH3T9Xlan3XFDnUZyI+vZovfh+9F2XkOi7z2fR6OsVmjs93YViokuBTRt7ZQNQ5o75aGASdgJKOO/3S4Py8U20sfB0ocarBPytyteMR+s2C9CC7E+Rvum7SNpsbdyD/lk0vXo96iXNR0P3PMi6URyF3JzDB+ONqEcZLoZfhTz9Dsb1QB9GyiB9KN1MtfgpwFaoUNdoLl3ouw0bmGZNlTUaX+as3gD+VmVf3GdPE88GCYWX0Kj6InTffYgS9g5DUo5h7sQpaADxx+D/p8gmS8wYnKPfQvTsvQB5ooaprgajzxl+5mkonraP2hS/2pZwXbEXZWuohk2R9ulstFZyA1HdvHEo2e0s5PTxFPpiJjTE4vrII0vGQDRFfR8aRf8LxaZNjtXbCfg9up6zUBaFar2BB+DyV+ahomFECXOMllBmhFZhBVznLIuYw53Qg/kE1Hhcgzxz46OsLLgC14mppMB1GGp03kDPtdOIhrF8Gj0bX0WOL9NQnGojBVIqsURg5wNodPoUcDUatPjsgmLJX0ZOkd+gtiiEtmVb3E38uZxtaSZ5JhluJpvgvr929eZtFb6K+y6q9RouEvcj22c0+X1GEM1G72/1SqzVywDcbFlHqroYi9OFehJpzjHtQrs2iqHH2Vw6by2oSOyIW1MqYixiNeyPa5yaGUM8DIkXXIymHv1GsVwuw2bgDwqyEOw2WoRvoR/FAhSD045cjAR724khuAXzdvtsrcRaaE29hGLUhudrTt0MQtN+JRTMngX+TEeJ7L3SfxG87z/ILuG50QIsgfK7lajNwcPIl2/g3MNb9UHc6qyIi0V8kaiObSvydfRZ3iU9Xq+RfJtomEOWa1rjkTNKCXmIGkaE/dCP4x2yuRmM/jEYOTmVgENztqVTGY5GhiU0Ys/Cu7AeNkQOX9V0nLpxHtInN9OoAD/uuZzQRTO4MnjfPDJaGC1COJXQik4CncbpOHfqVly/anUG4mJRF+DUTYpGN4ohnk31QeNrowDvBTS3oe/GJSYooXjbrNgEedzPpbidGaMADEfTqH0snpvLKA4bouDcl9H0nZEtfiziIhTnVlQOpb4158OD101FyyvNIC6PlpUI9WDgn+g5t2dG72m0MKuiXuUcrAdVREYjUYS5LJ4/zciGk2mNMJhJ6D7uo3p1JJ9wNqJaucFaOQZ3HeeSzYxHFwr7KAHfz+D9jDZhdTQKeRwYmrMthmMwiqV6n+oF3I3GchAuyP38nG0px+oocLuEgrjr5ZzgHAc1wqgYd+EaxbuacP4kjsc0go06GYdUJnbK2xDjIzZC0nrrVqpoNIXtcbGIt1BcF/6NcblSS1Qv9p/GEcjPoJGeoT1EBfHT8jgugURFTkTOQv1RhulBfhP9vR6GYRgdz5o4p5DpFDNDfQ/SrgzDDEpIb7ha+cYsiccnbplQZy8kexgKXJeABzEpMsMwjFwZiwt/eQqJvReJJZFDTahM5W/Xl3ldnhyNs/EDos48A9C0bS/SZl4bpUcLY6k3zdRSwzAM4yP8vIivUVkwOitWRCnYrsIJwidtO+ZkXyXuwNnoJ8buQY4wbyBxbZBwuJ/L0E/GbRh1Y7FshlEbA5Ee8Doo/+WuKJtAM98vdGxbAoVIjQaWR43gasiBZiLwsSrONxtlQSgaPUSnS8OEuEPQyHYdNBp8Bo0af0R0yvSVDGw0OgBrFA2jerrQ1F2YIHgptJYYZx5yvqmXHiSQ3QyuRXGURWM9ognI70frnrehqemt0HQ1qFH0G8R/othJwzAMI0NOIn1KslW2osYZfwdn40IkqD4DZcxIWq/dESXp/gmwXEY2GoZhGAFfJLqG1YrbtIZflcbh652+H2z30LwRs2EkYm7MhlEdv0bTpXGWROmVWoFzUUxe0egG3mJxcfKXgPtQ1vqb6d+UtGEYhmG0BBsQHdFeBvwJhV+Ex54jOW7RMAzDMNoKP3/iHJwD4FiUOiosWwCsn4eBhmEYhpEVv8Y1fL+NlfWgNFdh+ZXZmmZ0GkXVaTQMozPoAjb3/p8SK+9Fgvch8VjM3ZHM29jGm2Z0ItYoGoaRJ6sRDam4L6GOH5LxcqzsMCRe8HqD7TI6FGsUDcPIky28/TnAYwl1VvD2ffWgZZD+6S8xz1SjQZiijWHUz7JoFBP+fYf+5SnsRPxGcSrJajsLvP1/e/vfRDJ4ts5oNAxrFA2jPtZCCbd9zqEYjeIYlG9wAvAeWpO7HzmqFA2/UUyaOgXZPjnYXzb4uwHyWr0GeKQ5phmGYRjVMhRJjZ2A84zcI1eLxJFoZDUTBetfjfInPkrxJN5G4FSC+lBHI4llcSmi3gVuRVOtz2ASb4ZhGIViN9xDPe8H9CGBLbcDg73j6yHZtNkUL7nwxcDfUe7HcowETkfeqf8ALkHZQgzDMIwCcS5qiJ7I2Y7hwNtoTW7FhPIfIjsvzNIowzAMo7N4DDU2F+dsxxGBHY+mlG8elM9ncY1RwzACLCTDMOpnFLB2sP9gnoYAOwd/X0opfzH4OxjYofnmGEZrYo2iYdTPVrh76P6E8pFE1/aaySbB3zdTyt/y9jdqsi2G0bJYo2gY9bN18PdZ3EgMYDPgIaS+8jrRsINmMBoFsoMS9CbhH09aczQMA2sUDaM/bBP89UeJXwAuBU4EDkLhEYc12Q5f8aU3pc4iXJziyOaaYxitizWKhlEfI3FxdWGj+D0UWrANkh27DoVp9HqvmU80d2C92yzPFj/5cVqj6JdZo2gYKZiijWHUh7+e+ABSs/kYCuhfACwdlPUC1wb7b6N8gEtW+R5zSJY9A/jA21+iyvOF9g6rsr5hdBzWKBpGfYTriXOBs4FXgf1wjdhtwMbI8cUf1c1sgi3+emF3Sp3BXtn8JthgGG2BTZ8aRn2EjeIwYCd0L+1K9J56mGiD2CzmevsDU+oM8fbfb6IthtHSWKNoGLUzAlg32D8t2HZAmpzTcKLVWfGCt582++NP2b6QUscwOh6bPjWM2tkS16G8CIVenIfUbTYGjkcZHOL0APsDgxpgw5vALcH+nMCGFUlXq/Ebxaca8P6G0ZZYo2gYtbNl8PdJXCb491A+wAkoE3zIsWi68gLkJboP1TvGlMNvFEHOPvuSLkrue6gmCQ0YhmEYRl08gMIiLo0dvzs4flnwfxeaqtwuA5t2D977LZKdbb4SlL+QUm4YhmEYNTMIF2u4f6zstuD4ccH/e6Ccf1ms3XcDfwvef+9YWRdwb1DWbCEBwzAMo4MIs030ASvFyg4Oyn6HBLpnI4/UrJgEvIKmVndCjeFQNHVbAm7AnOsMwzCMBjIJmAGcnFDWhTLfTw+2/TK0K2QcWmvsRaEavWjd8yhs2tQwDMPoUIYBawJjUWNtGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGI3h/wH2f3gGeyDQ7wAAAABJRU5ErkJggg==\" data-mathtext=\"(x%2Ba)%5En%3D%5Csum_%7Bk%3D0%7D%5En(%5Cfrac%7Bn_%7B%20%7D%7D%7Bk%7D)x%5Eka%5E%7Bn-k%7D\" advanced=\"false\"></figure>",
                        "value": 3
                    }
                }
            ],
            "solutions": [
                {
                    "id": "293d752e-844d-24c6-dd48-1ac78bb2793c",
                    "type": "video",
                    "value": "do_113143853080248320171"
                }
            ]
        },
        "status": "Draft",
        "media": [
            {
                "id": "do_11310507846892748812026",
                "type": "image",
                "src": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/do_11310507846892748812026/artifact/icon.png",
                "baseUrl": "https://dock.sunbirded.org"
            },
            {
                "src": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/do_113143853080248320171/artifact/1604474270424.thumb.png",
                "type": "image",
                "id": "video_do_113143853080248320171"
            },
            {
                "id": "do_113143853080248320171",
                "src": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/assets/do_113143853080248320171/13mb.mp4",
                "type": "video",
                "assetId": "do_113143853080248320171",
                "name": "13mb",
                "thumbnail": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/do_113143853080248320171/artifact/1604474270424.thumb.png"
            }
        ],
        "qType": "MCQ",
        "mimeType": "application/vnd.ekstep.qml-archive",
        "primaryCategory": "Multiple Choice Question",
        "solutions": [
            {
                "id": "293d752e-844d-24c6-dd48-1ac78bb2793c",
                "type": "video",
                "value": "do_113143853080248320171"
            }
        ]
    },
    {
        "code": "29768037-4c37-a10f-8823-5218826db206",
        "templateId": "mcq-vertical",
        "name": "untitled mcq",
        "body": "<div class='question-body'><div class='mcq-title'><p>2. What does a dummy-variable regression analysis examine?</p><p><br data-cke-filler=\"true\"></p><figure class=\"image\"><img src=\"data:image/png;base64,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\" data-mathtext=\"A%3D%5Cpi%20r%5E2\" advanced=\"false\"></figure></div><div data-choice-interaction='response1' class='mcq-vertical'></div></div>",
        "responseDeclaration": {
            "maxScore": 1,
            "response1": {
                "cardinality": "single",
                "type": "integer",
                "correctResponse": {
                    "value": "1",
                    "outcomes": {
                        "SCORE": 1
                    }
                }
            }
        },
        "interactionTypes": [
            "choice"
        ],
        "interactions": {
            "response1": {
                "type": "choice",
                "options": [{
                    "label": "<p>2 September 1929</p>",
                    "value": 0
                },
                {
                    "label": "<p>15 October 1931</p>",
                    "value": 1
                },
                {
                    "label": "<p>15 August 1923</p>",
                    "value": 2
                },
                {
                    "label": "<p>29 February 1936</p>",
                    "value": 3
                }
                ]
            }
        },
        "editorState": {
            "question": "<p>1. What does a dummy-variable regression analysis examine?</p><p><br data-cke-filler=\"true\"></p><figure class=\"image\"><img src=\"data:image/png;base64,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\" data-mathtext=\"A%3D%5Cpi%20r%5E2\" advanced=\"false\"></figure>",
            "options": [
                {
                    "answer": false,
                    "value": {
                        "body": "<ol><li>The relationship between one continuous dependent and one continuous independent variable</li></ol>",
                        "value": 0
                    }
                },
                {
                    "answer": true,
                    "value": {
                        "body": "<ol><li>The relationship between one categorical dependent and one continuous independent variable</li></ol>",
                        "value": 1
                    }
                },
                {
                    "answer": false,
                    "value": {
                        "body": "<ol><li>The relationship between one continuous dependent and one categorical independent variable</li></ol><figure class=\"image\"><img src=\"https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/do_11310507846892748812026/artifact/icon.png\" alt=\"do_11310507846892748812026\" data-asset-variable=\"do_11310507846892748812026\"></figure>",
                        "value": 2
                    }
                },
                {
                    "answer": false,
                    "value": {
                        "body": "<ol><li>The relationship between one continuous dependent and one dichotomous variable</li></ol><figure class=\"image\"><img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcUAAABzCAYAAADpJRlYAAAABmJLR0QA/wD/AP+gvaeTAAAeN0lEQVR4nO2dabgcVbWG35NzQhJISAghBIhJECQQJpnHAMqojMqoiIhwFbig6FVkEhkElfECMiMXBAEBQUEEBSOTCRERImhAhDCFeUwISfDk9P3xVbF3Vap6Ot1V1d3rfZ56Tp3au6tXV3fVntb6FhiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGUTRGA7cCs4HbgE8Ex4cDJwMzgFeAvwCHAwNysNEwDMMwmk4XMB04GzgYKAHPAesCs4Arge2BDYAHg/Jj8jDUMAzDMJrN9qgR7AHGo0avBLwHfD5W96CgbGaG9hlGx2JTMoaRPQcANwG9wOre8Z8At8TqLh38XSYDuwyj47FG0TCyZwBwfbC/VfD3OdQoxlkj+PtMk20yDMMwjNwJ1wyvSCl/NihPajANwzAMo20YAixAjd4BCeXr4NYbN83QLsMwDMPInE/hGr3xCeUnBmUvY0sdhpEJdqMZRn5MDv4+CzyfUL538PcmoA95q54PjGy+aYZhGIaRLb9HI8FLE8om4kaRmwXHdkQOOdaZNQzDMNqKbhSXWAL2Sig/MCh7BwX7dwH3AidkZJ9hGIZhZMZ6qNHrJXk6dMug/F/ACDRt+ghyzjEMwzCMtmIb1CBeXabOqcAcYCGKa1y2+WYZhmEYRj4MqrLewKZaYRiGYRhGriwNXIAchx4HzmLxkfB4lDHkIeAl5KF7J/AFtMZqGIZhGC3PUsDfgHeB64D3ceuno1CD9z3gg6DsAeAa1HiGHrk3YA2jYRiG0QacDixCzkQAF+Iaux8DPwvKzyA6ehwIPOHV3Scjew3DMAyjKQwB3gR+5R07BdfQ9QIfAl9Mef3/enWvbZ6ZRqfSk7cBhmF0FJ9Do7+fe8cmePvdwHFoWjUJ/5k1uqGWGYZhGEbG3AjMR+uKIc/hRn/3UV6x5x6i64qG0VBspGgY9dMDDMvbiBqYh6Ym8+Q14OzAFtAo0RdDPwnpvKYxydt/opGGGYZhGNUzDzdCadXtnIZflf4TytmVUBqtwWXqfpLo59mi6dYZHYeNFA2jOt4HlixTPgs9qBvFMNz96e/3h4NQOqr3G3CuRrGVt/8QahjT2M3bfy2o30kMRCEro4CnKX+tDMcA3HV7FXg7X3MMoz3YBU3rpY3CvpGBDd3A8mgKcSvUyJ2OUks9X8Y2fzs8Aztr4d84206qUPevXt2kzCLtyhlI7s//HpPybxpRvowE9f3rtnuuFhlGm+GHA8S3BWh6L0/GIrWXW9DaYZKdMylO0PtKRG37dJm644h2Sj7TdOuKww7A8cBT6LMn5d40FmcD4DtI/KGEfj+mH2wYDWQQUmJJaxhnEvWqzJPRwLFINSZu5w452uWzL9FORbkMIP/j1X2LqB7sSGDFJtlYJP6AxWfWwxnoupljlmE0gYnAXNIbxp/lZ1oio4HLiY6yfpurRY7zcTZNqVB3ulf3sljZ08CfG25dsVgCJ4f39ZxtaTXCafeL8zbEMNqVgyi/bpemxpIne+Meqn2occ8bf9R9XJl6Y4k26v4060Zkt6abJ5Nxn39ShbqGYzhSSSrqfWkYbcMvSG8U3wVWzs+0VNYDXkc2npezLcNwD6sSatzS2M+r9x5yOAq5CU29tvta0Yno879BcdaEW4HdcL+djzXjDXYHXkG9TqMYbI7WWP47b0M6jKE4x4ek7S9oyqtobIEakTmoF10Pw4DbgIep/wG9A+5avUl5FZuveXX9adbQI/jMOm0ANbD/Qo1ruZCbvJmCPv+teRvSYpyLrtusZpx8b9SzuxHrqRSNcG3m2Dpeuy3wT9TZuRj3YFgP+CXwMooJuxfYrr+Gthkbk+7lWQJ+lJ9pZTka2ffNOl47FK3fzQc27IcNJ+Ou040V6q6MGvIS8AgwAjgUpZa6l/IB/9WwPfCf4FxFbBgHoc9aAr4VK9sPdcDeQDkps2Kd4H1fR99fqEP7ceAK5CH7ZlDnCxnaFSecor8qdnwykgx8A3U0au7A7oxu/pm0lqxVp9AN/I7km6Ycq6E4np2Bq4PXX45i2WYDR6HGcTIKeP2Q/j0I25GwgUnaFqFOR9EIUzA9TfkRWpzBuBHLf/XThvD3VgL2rKL+t9D1DF/Th0TFh/bTjpBDg/PejRqhIrEV7nOvHxzrRim37gF2RA5eJWCVDOwZgYLgv4rr3EwBdg2On4Q6jOuj31i133Ez7Ax/M1/1jh8BzAhsOgEN9mqy75M4zcS1GmGp0RRCtYZFVO9yfxHKfg5yVCgBC4EnWXz+/ZagvD9TVe3IAOD3pDeMLwPL5WZdOmug2Z9aOrnXos/UCCHuUWjKv5Z4w4moMT4EWLsBNsS5GX2+nzbh3P3h+7i16m40mr0dacgOQJ2D8PeWRazst4E7gv3P4jqAs4F1Y3XPJL9p311x12VVNMN5Frp2S6GOVlh+YLUn7QH+TjEW5o3KhHFfrwErVKg7EI3+Qv3Ii3DxYkkPnD8F5Z2kJFIto9H0c1rDeCetv+SwN/os85A3aDsyBt0TJWCvnG3xCTOD3IFiMh8AjvTKZwTlz5DNKPdRpBYDLn60DzWQcS4Pyv+YgV1xzgreezZ63v0cuATnqBXOVsylBse4w4MXvU37e3e1Cw+h76xSgO9YtBYQ/kD+QfnOz6tB+dENsLEd2ZHo9F58Oyo/0/rNYJy26w9ytqXZHIfrWC6dsy2gta5QjP464DG0juizJnpWV+oIN4IetFQzKvj/N4FtabGvfw7K47GlWRDGJ96LhA9OiZWPQbMVVYe4jMC5bx9ZoW6rMpRiLqz3h8/gem7Vrv8th4sD2zmhfD3cw32zBtjYroRTRUnbAtx6UKsRNhQvUhzFnmYxFDlflIAf5mwLaCbH/x1NBfagvPpPVgxAnu9pTlsjcI5oB6Sc4wXS75lqt6QYVT8+sYRydh5APwd3P8SNEovwBTSDKajX0050IRfzcr23OHsF9XvRDznOD4LyV6nNMaPTGAhMI/3mfZrWc1QbiWIDS8AxOduSFaEs2DxgmZxtOR73HD4FeBx3L+6Uo10QTeWVtJa5f1D2IfodJbE88ljtz5Y0ZbyzZ9upKHl1CQlYHFHTpwxYBncjXFjPCVqEx2jP9DPH4ha/J1RRPwzpeCSl/NGg3GSSKrMK7t5J2q7KzbL6CL0L/0Nn6IuCHHrCmZO8lXJCvdNfBf93oVCfEoo1zXNZK3TOe5vkzvJNQfndWRoVEHZsnvGOhSIQfcg7tibCtcQS7Z3Icwbt2SiuTLSXVIkwlufshLLVvHNtExxbt8rzdir7UH66Z//8TKuJbuSkkNeDLU/CjmCeItLduJRRvjjHONxvKcxHOQS4kmzXQW8MbPh1QtlQ3FroIcGxFcjOUW9q8N6Xx46H071+Z+cMtC5blvtxQ82BFeq2Mo/Tno0iuPigxyvU8+W2kqZjjsF5cIW9wUtQGiUjnatIbxTnos5G0fkUzubjc7Yla8KRRgn4RE42rO/Z4IfDresdXyM4thvKTZmll/PLgQ1J05HhksxC3NTpd8hGjH4wTuzhS97xbtyzLnRWGh/UHUUZBqMP0gm9wydo30YxDLEoUT4haSi3tYBkp6NbiU77jUOdJYtZLc9SSOwirWF8mGLKwPn4qjNb5mxL1myP++y1CGI0kiOD93+TaGMXOr4twq2n3YYC0bPi47jrkyQuHzqdPRj8PxR1rHfNwDZfPH2cd3wgWgYo4bR2T0XTvB/Rk3DC9XA369R+GNaDhvarIImiacCzsTrD0EN5GaQj+WBgcFYUyWlkDRRgOgK5Es/s5/n+6u1vR3pKo3B6fCr6nuI8Gfydg1yXr0PxP5abrDzz0DTqdJId1TZEjhNFdl4J110+RI14J+Gvr2+HNDSrZSRaahiNHGL+iGYHfFZBHY1F6DfydMJ5Ng/+hjN3IU8G5x2DZhw2RY4u9UzLrxnYMhxJsj1V5evCTtILKa8JnxvvoYbpchTrfHsdNtZK+EybhewL+Q8KEdkaPWuXRkuFm1MBP8q/Xs26A1g8mHkRcA1OlmlPJDHm15lGtoHBM8l3pNiF0hCFAgn+djP6oa6LHGEOrPHcG3jnuqRMvdORjmWazNFwNFr8AE2X5O140GqEzghJ2yI0IikiXbj1lycr1G1XwnCB16usPxTF+YYzbeH2Lm5NcCC6n/2Y1t7gWHfsfDei7yBJc3hz5BOxCDkM1qLw04VE1sPYZH+7Lvgc6yO1q7R0S4cEnzNtFN2DGsI5wWc4jeRBWDM4Dj2vkpIkrIw6KR+i7zcpBG0xbsBdoHLpXNI4BTc9tAsaZn8eTQGUUCDl7ujLvBM9vNfABYHesdgZm0eejeJy6POHD8czUK9vtWC/D43e/I5DLTqPQ3AedH+tUDd+MxqNows5IqQ1jK+hHn/RmIizsShJibMmvD8rLUGARh1T0T13ORplT0Q6oP407BXofv8Bute3wDkzHZxw3kr3Zq0NzRicQk4vaqxWBVZHfgIlpJgTOvgsIn2av8jPjbqvW1KBH93/TEJ5OfZBOn3nI/mf3uD4s+iin4aGrluixmjXoM7laKEYtLgfzv22K6NQb2Vt9Pl3JxovGarGfNc79jxay6uW+TglotUr1F1Uw3kbyWSco0AzCZXw8yB82G1A8izIaOD/cBqSRcH3xqv1OdAuvOTtT0T3YBqXou94F6L38kloNLIhWmfrRiFTP0Yd49/gQl12YPFljkr3Zm+Fcp/l0RTm6mik9Fmi8mtHoSUlX6zl6aBuEnk9N6qhkdftoxirWh7AoHnjt1GvMmmt7hCiPeRwTnrN2PH5Ka9vBnmMFAfh5IdKqPOQxAiiigy/qOO9/GnZIsr0PUn6CKqRWy8VvMsyYCui32d8S/sd5MVRONu+W6Fuu+I7GpXLCnJgUOeQlPI7vPO8hPPoP4Hob6ARQutpLInTSC2Rnn91NG6GqUS6L0LbEh8pDsfFucyr8VynBq8/Cl3UOBO8/VfRgicsrvBxXcrr24WfoB4lqAeeFtowB82Lh9fnzyn1yvGGtz8Oze0XiR2oLzThnRrrv4em7/PkfrR++/2U8h8hR7PpmVlUHj9LSq3PgnYhfv8kMQQtd8xAU6NJTPD2b8PNgsWfffV0fKvlHJQDETQYSBPieBeNDEOv1nqeO23FWFwPIe4pWo4ByLuqnGTaXd65r/OOd6GHxVS0SJ2lFmnWI8XNiPbCDi9T149FKrF4SpZq+K33+q3reL3RWAbg8hEmbf+mGCLU4LIblKjdyatd8Ge30jqvO1J+lLg00RkCP/vGCsih7l6i+f4azTZEf2fl3mvTWN2kcIu2Jj5S9F3Ha+kd9iFvqFfKvI/v9jrF2y8hb6H+Mp7F1eMrsSyKJ/teDa8poZi9aj3SfE7CxRv14aSbkpjs7c+hvhCIBd5+uwmftyJ9KOXOYyRPZ6+CPP6K0AjV+yzwuYn6OnON5nHqS3Lr3z9pQugPoJmfv6eUb45z+uhDDWDIK2STouokb/8/lF9f9587byId5Y5mEq6HkKaDWQ8bEe19NCM7dCicm8V2WB32+XJpJXQzleN6r+5ddbxf/Bx71HkOo/F8nvTf1kJgpfxM+4hf4mzarULdNKbTmPutv1sl7+s0fLm+n9d5jlCntIQ6Q1mzDtFrUUmQ5VavbpJ8W9sTHyn6PaNGZsbY1tt/geZ4s51J7Y3Hzcih6Cs1vKbeH/cusf9/U6G+ryBS77y+rx4/v85zGI3nFrSmE+9chdNwszO3aHH830u9z4KbaWznul7KeY2WY7C3nyRsUQ2f9vbzSLRby3Oni6jWdUeuJ8YbRf+Lb2TeNP+HcU8Dz+vzIbXfgAvQ1FAWN+4msf8fTKwlViHqvl+vspD/MKv3pjaaw7fR1Jo/vXgiErgoAn6jWO+z4MxGGJIj/W0Uh+Oc6kDhEFlTy3NnEgoTCemPolnLEm8Uw0DxLhrXKC5BdD0xjx9GEfCzYi8ifQ0CFKsZ0kv9Hon+OuLbdZ6jmexJfQIRtfIaLjC5KCxAiiVho3gFxUhqG+L/Xjp1Pdp/Btbq8QxycAnXE3uRB3LW+M+dhUjFJg3/ubOQYozyC0GofL6A2hTXe9ADblLs+NZE57TTFOcnojidWuSK+kuW3qcP465BJaeZa726/g9zaXSNNq3yPcNMGSWK49Xo48dNNXObT/5xinF2wokT30l2EljV8jXc9WuEI1wr4mfKOLBMveHIQWV07HjYEStRvhP8JZqXZzNMSlzN2urNXl1/6nQkWmPeIOlF7UbSjfg86l0MQgv+LyXUiTMcLeCGvf4vIicPiC7SzyN9PfFoYG+UXqQd8XuaSeK/Ptt4+/6P80vAvqTHQ8UJe4nvIg/WorEV2YgKvE/+cYo+a6HOTQ/qIO1HjQobGeCvw308NyvyxR9lvZBSZ0u0TjcSxcOuhjzTu4g++9IaxUFIYH9WvyxNp9rnzgCiYVv+c+cryOnogsaZ1VpchustbFPla04l2jMPY3q6cKK6JdJHZSuiOfusvZ2yHCmejbsO5UIx4glq/TCTP6EA/EEJr4uzrHeOKRXqGtmxEu6eeIlokHyRGIP7/XTqksd96PP3oUw+STxB9H4Nk/5uHDt+dOKrJQFYaSTaHy70bLi2TL0vE7XX91afhsJHijabkRn+tElaQGqc24le0FB5fJvY8ZsTXjsIXfQPqKzR2WiybBT9hK1paXgmIxEE/5pNCMrGoNHEhXW83+l1WWw0mqVxU8bv4RRGikooVP1i3obkQBdaVy2RnsZtCaJiHK/jlinOJ3ofJ2WbWBvd79Npnrj2Zzwb0tY0t0XPX9/eUKR+HPqMZzXJvpbAj2s5r8rXnBvUfwMX3jAaaVu+jEu2+iLRta0JqBfah9JNZU3WijZ3o+uwiGjIRRfKXj0Pzfu/jvsOVg3qnIc8bKvNAu5rV+7eX8ONfjMQ+AP6Pj6kuCmjfH6FGykVUTu3mYzH3T9Xlan3XFDnUZyI+vZovfh+9F2XkOi7z2fR6OsVmjs93YViokuBTRt7ZQNQ5o75aGASdgJKOO/3S4Py8U20sfB0ocarBPytyteMR+s2C9CC7E+Rvum7SNpsbdyD/lk0vXo96iXNR0P3PMi6URyF3JzDB+ONqEcZLoZfhTz9Dsb1QB9GyiB9KN1MtfgpwFaoUNdoLl3ouw0bmGZNlTUaX+as3gD+VmVf3GdPE88GCYWX0Kj6InTffYgS9g5DUo5h7sQpaADxx+D/p8gmS8wYnKPfQvTsvQB5ooaprgajzxl+5mkonraP2hS/2pZwXbEXZWuohk2R9ulstFZyA1HdvHEo2e0s5PTxFPpiJjTE4vrII0vGQDRFfR8aRf8LxaZNjtXbCfg9up6zUBaFar2BB+DyV+ahomFECXOMllBmhFZhBVznLIuYw53Qg/kE1Hhcgzxz46OsLLgC14mppMB1GGp03kDPtdOIhrF8Gj0bX0WOL9NQnGojBVIqsURg5wNodPoUcDUatPjsgmLJX0ZOkd+gtiiEtmVb3E38uZxtaSZ5JhluJpvgvr929eZtFb6K+y6q9RouEvcj22c0+X1GEM1G72/1SqzVywDcbFlHqroYi9OFehJpzjHtQrs2iqHH2Vw6by2oSOyIW1MqYixiNeyPa5yaGUM8DIkXXIymHv1GsVwuw2bgDwqyEOw2WoRvoR/FAhSD045cjAR724khuAXzdvtsrcRaaE29hGLUhudrTt0MQtN+JRTMngX+TEeJ7L3SfxG87z/ILuG50QIsgfK7lajNwcPIl2/g3MNb9UHc6qyIi0V8kaiObSvydfRZ3iU9Xq+RfJtomEOWa1rjkTNKCXmIGkaE/dCP4x2yuRmM/jEYOTmVgENztqVTGY5GhiU0Ys/Cu7AeNkQOX9V0nLpxHtInN9OoAD/uuZzQRTO4MnjfPDJaGC1COJXQik4CncbpOHfqVly/anUG4mJRF+DUTYpGN4ohnk31QeNrowDvBTS3oe/GJSYooXjbrNgEedzPpbidGaMADEfTqH0snpvLKA4bouDcl9H0nZEtfiziIhTnVlQOpb4158OD101FyyvNIC6PlpUI9WDgn+g5t2dG72m0MKuiXuUcrAdVREYjUYS5LJ4/zciGk2mNMJhJ6D7uo3p1JJ9wNqJaucFaOQZ3HeeSzYxHFwr7KAHfz+D9jDZhdTQKeRwYmrMthmMwiqV6n+oF3I3GchAuyP38nG0px+oocLuEgrjr5ZzgHAc1wqgYd+EaxbuacP4kjsc0go06GYdUJnbK2xDjIzZC0nrrVqpoNIXtcbGIt1BcF/6NcblSS1Qv9p/GEcjPoJGeoT1EBfHT8jgugURFTkTOQv1RhulBfhP9vR6GYRgdz5o4p5DpFDNDfQ/SrgzDDEpIb7ha+cYsiccnbplQZy8kexgKXJeABzEpMsMwjFwZiwt/eQqJvReJJZFDTahM5W/Xl3ldnhyNs/EDos48A9C0bS/SZl4bpUcLY6k3zdRSwzAM4yP8vIivUVkwOitWRCnYrsIJwidtO+ZkXyXuwNnoJ8buQY4wbyBxbZBwuJ/L0E/GbRh1Y7FshlEbA5Ee8Doo/+WuKJtAM98vdGxbAoVIjQaWR43gasiBZiLwsSrONxtlQSgaPUSnS8OEuEPQyHYdNBp8Bo0af0R0yvSVDGw0OgBrFA2jerrQ1F2YIHgptJYYZx5yvqmXHiSQ3QyuRXGURWM9ognI70frnrehqemt0HQ1qFH0G8R/othJwzAMI0NOIn1KslW2osYZfwdn40IkqD4DZcxIWq/dESXp/gmwXEY2GoZhGAFfJLqG1YrbtIZflcbh652+H2z30LwRs2EkYm7MhlEdv0bTpXGWROmVWoFzUUxe0egG3mJxcfKXgPtQ1vqb6d+UtGEYhmG0BBsQHdFeBvwJhV+Ex54jOW7RMAzDMNoKP3/iHJwD4FiUOiosWwCsn4eBhmEYhpEVv8Y1fL+NlfWgNFdh+ZXZmmZ0GkXVaTQMozPoAjb3/p8SK+9Fgvch8VjM3ZHM29jGm2Z0ItYoGoaRJ6sRDam4L6GOH5LxcqzsMCRe8HqD7TI6FGsUDcPIky28/TnAYwl1VvD2ffWgZZD+6S8xz1SjQZiijWHUz7JoFBP+fYf+5SnsRPxGcSrJajsLvP1/e/vfRDJ4ts5oNAxrFA2jPtZCCbd9zqEYjeIYlG9wAvAeWpO7HzmqFA2/UUyaOgXZPjnYXzb4uwHyWr0GeKQ5phmGYRjVMhRJjZ2A84zcI1eLxJFoZDUTBetfjfInPkrxJN5G4FSC+lBHI4llcSmi3gVuRVOtz2ASb4ZhGIViN9xDPe8H9CGBLbcDg73j6yHZtNkUL7nwxcDfUe7HcowETkfeqf8ALkHZQgzDMIwCcS5qiJ7I2Y7hwNtoTW7FhPIfIjsvzNIowzAMo7N4DDU2F+dsxxGBHY+mlG8elM9ncY1RwzACLCTDMOpnFLB2sP9gnoYAOwd/X0opfzH4OxjYofnmGEZrYo2iYdTPVrh76P6E8pFE1/aaySbB3zdTyt/y9jdqsi2G0bJYo2gY9bN18PdZ3EgMYDPgIaS+8jrRsINmMBoFsoMS9CbhH09aczQMA2sUDaM/bBP89UeJXwAuBU4EDkLhEYc12Q5f8aU3pc4iXJziyOaaYxitizWKhlEfI3FxdWGj+D0UWrANkh27DoVp9HqvmU80d2C92yzPFj/5cVqj6JdZo2gYKZiijWHUh7+e+ABSs/kYCuhfACwdlPUC1wb7b6N8gEtW+R5zSJY9A/jA21+iyvOF9g6rsr5hdBzWKBpGfYTriXOBs4FXgf1wjdhtwMbI8cUf1c1sgi3+emF3Sp3BXtn8JthgGG2BTZ8aRn2EjeIwYCd0L+1K9J56mGiD2CzmevsDU+oM8fbfb6IthtHSWKNoGLUzAlg32D8t2HZAmpzTcKLVWfGCt582++NP2b6QUscwOh6bPjWM2tkS16G8CIVenIfUbTYGjkcZHOL0APsDgxpgw5vALcH+nMCGFUlXq/Ebxaca8P6G0ZZYo2gYtbNl8PdJXCb491A+wAkoE3zIsWi68gLkJboP1TvGlMNvFEHOPvuSLkrue6gmCQ0YhmEYRl08gMIiLo0dvzs4flnwfxeaqtwuA5t2D977LZKdbb4SlL+QUm4YhmEYNTMIF2u4f6zstuD4ccH/e6Ccf1ms3XcDfwvef+9YWRdwb1DWbCEBwzAMo4MIs030ASvFyg4Oyn6HBLpnI4/UrJgEvIKmVndCjeFQNHVbAm7AnOsMwzCMBjIJmAGcnFDWhTLfTw+2/TK0K2QcWmvsRaEavWjd8yhs2tQwDMPoUIYBawJjUWNtGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGI3h/wH2f3gGeyDQ7wAAAABJRU5ErkJggg==\" data-mathtext=\"(x%2Ba)%5En%3D%5Csum_%7Bk%3D0%7D%5En(%5Cfrac%7Bn_%7B%20%7D%7D%7Bk%7D)x%5Eka%5E%7Bn-k%7D\" advanced=\"false\"></figure>",
                        "value": 3
                    }
                }
            ],
            "solutions": [
                {
                    "id": "293d752e-844d-24c6-dd48-1ac78bb2793c",
                    "type": "video",
                    "value": "do_113143853080248320171"
                }
            ]
        },
        "status": "Draft",
        "media": [
            {
                "id": "do_11310507846892748812026",
                "type": "image",
                "src": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/do_11310507846892748812026/artifact/icon.png",
                "baseUrl": "https://dock.sunbirded.org"
            },
            {
                "src": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/do_113143853080248320171/artifact/1604474270424.thumb.png",
                "type": "image",
                "id": "video_do_113143853080248320171"
            },
            {
                "id": "do_113143853080248320171",
                "src": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/assets/do_113143853080248320171/13mb.mp4",
                "type": "video",
                "assetId": "do_113143853080248320171",
                "name": "13mb",
                "thumbnail": "https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/do_113143853080248320171/artifact/1604474270424.thumb.png"
            }
        ],
        "qType": "MCQ",
        "mimeType": "application/vnd.ekstep.qml-archive",
        "primaryCategory": "Multiple Choice Question",
        "solutions": [
            {
                "id": "293d752e-844d-24c6-dd48-1ac78bb2793c",
                "type": "video",
                "value": "do_113143853080248320171"
            }
        ]
    }
];