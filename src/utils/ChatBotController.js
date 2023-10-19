import { botAction } from "../store/bot";
import { centerAction } from "../store/center";
import { profileAction } from "../store/profile";
import { v4 } from 'uuid';

let check = false;

export default function botControll(text,navi,dispatch,speech,isLogin){     
    const currentURL = window.location.href;
    botDefaultControll(text,navi,dispatch,speech,currentURL,isLogin)
    switch (currentURL){
        case 'http://localhost:3000/' || 'https://web-react-mini-project-jvpb2alnvkso15.sel5.cloudtype.app/':
            return botMainControll(text,navi,dispatch,speech)
        case 'http://localhost:3000/login' || 'https://web-react-mini-project-jvpb2alnvkso15.sel5.cloudtype.app/login':
            return botLoginControll(text,navi,dispatch,speech)
        case 'http://localhost:3000/profile' || 'https://web-react-mini-project-jvpb2alnvkso15.sel5.cloudtype.app/profile':
            return botProfileControll(text,navi,dispatch,speech)
    }
}

const botDefaultControll = (text,navi,dispatch,speech,currentURL,isLogin) => {
    if(text.includes('이동해')){
        if(text.includes('페이지로 이동해')){
            const parts = text.split(' 페이지로 이동해');
            const textBefore = parts[0]
            switch(textBefore){
                case '메인':
                    speech('메인 페이지로 이동합니다.')
                    return navi('/');
                case '로그인':
                    speech('로그인 페이지로 이동합니다.')
                    return navi('/login');
                case '프로필':
                    speech('프로필 페이지로 이동합니다.')
                    return navi('/profile');
            }
        }
    } else if (text.includes('대해 검색')){
        if (text.includes('에 대해 검색해')) {
            const parts = text.split('에 대해 검색해');
            const textBefore = parts[0];
            (async () => await handleGenerateResponse(textBefore, speech))();
        }
    } else if (text.includes('대해 알려')){
        if (text.includes('에 대해 알려')) {
            if(text.includes('현재 위치')){
                switch (currentURL){
                    case 'http://localhost:3000/' || 'https://web-react-mini-project-jvpb2alnvkso15.sel5.cloudtype.app/':
                        return speech('현재 메인 페이지 입니다.')
                    case 'http://localhost:3000/login' || 'https://web-react-mini-project-jvpb2alnvkso15.sel5.cloudtype.app/login':
                        return speech('현재 로그인 페이지 입니다.')
                    case 'http://localhost:3000/profile' || 'https://web-react-mini-project-jvpb2alnvkso15.sel5.cloudtype.app/profile':
                        return speech('현재 프로필 페이지 입니다.')
                }
            } else {
                const parts = text.split('에 대해 알려');
                speech('잠시만 기다려주세요.')
                const textBefore = parts[0];
                (async () => await handleGenerateResponse(textBefore, speech))();
            }
        }
    } else if (text.includes('목소리')){
        if(text.includes('변경해')){
            dispatch(botAction.toggleVocie())
            speech('목소리를 변경 하겠습니다.')
        }
    } else if (text.includes('자기소개') || text.includes('자기 소개')){
        if(!check){
            speech('안녕하세요. 저는 리액트에서 구현된 간단한 봇 입니다. 잘 부탁 드리겠습니다.')
            check = true
        } else {
            speech('또 자기소개를 해야 하나요? 돈 벌기 참 힘드네요.')
        }
    } else if (text.includes('로그아웃')){
        if(text.includes('시켜')){
            if(isLogin){
                dispatch(profileAction.testLogout())
                speech('사이트에서 로그아웃 합니다')
            } else {
                speech('로그인 상태가 아닙니다')
            }
        }
    }
}

const botMainControll = (text,navi,dispatch,speech) => {
    if(text.includes('추가해')){
        if(text.includes('박스 하나')){
            const newBoxId = v4();
            dispatch(centerAction.newLayoutBox({
                id: newBoxId,
                detail: {
                    position: { left:Math.floor(Math.random() * 100 + 30),
                        top:Math.floor(Math.random() * 100 + 30) },
                    size: { width:62, height:32}
                }
            }))
            speech('랜덤 위치에 박스를 하나 추가합니다.')
        }
    } else if(text.includes('제거해')){
        if(text.includes('박스')){
            if(text.includes('가장 왼쪽')){
                dispatch(centerAction.delLeftBox())
            }
        }
    }
}

const botLoginControll = (text,navi,dispatch,speech) => {
    if(text.includes('로그인 해')){
        if (text.includes('으로 로그인 해')){
            const parts = text.split('으로 로그인 해');
            const textBefore = parts[0]
            if(hasFinalConsonant(textBefore)){
                dispatch(profileAction.testLogin({ user_name:textBefore, role:'admin' }))
                speech(`${textBefore}님 환영합니다`)
                navi('../')
            } else {
                dispatch(profileAction.testLogin({ user_name:textBefore + '으', role:'admin' }))
                speech(`${textBefore}으님 환영합니다`)
                navi('../')
            }
        } else if (text.includes('로 로그인 해')){
            const parts = text.split('로 로그인 해');
            const textBefore = parts[0]
            dispatch(profileAction.testLogin({ user_name:textBefore, role:'admin' }))
            speech(`${textBefore}님 환영합니다`)
            navi('../')
        }
    }
}

const botProfileControll = (text,navi,dispatch,speech) => {
    if(text.includes('이름을')){
        if (text.includes('으로 이름을 변경')){
            const parts = text.split('으로 이름을 변경')
            const textBefore = parts[0]
            if(hasFinalConsonant(textBefore)){
                dispatch(profileAction.nameSetting(textBefore))
                speech(`${textBefore}으로 이름을 변경합니다`)
                navi('../')
            } else {
                dispatch(profileAction.nameSetting(textBefore + '으'))
                speech(`${textBefore}으로 이름을 변경합니다`)
                navi('../')
            }
        } else if(text.includes('로 이름을 변경')){
            const parts = text.split('로 이름을 변경');
            const textBefore = parts[0]
            dispatch(profileAction.nameSetting(textBefore))
            speech(`${textBefore}로 이름을 변경합니다`)
            navi('/redirect');
        } else if (text.includes('으로 변경')) {
            const parts = text.split('이름을 ')[1];
            const newParts = parts.split('으로 변경')
            const textBefore = newParts[0]
            if(hasFinalConsonant(textBefore)){
                dispatch(profileAction.nameSetting(textBefore))
                speech(`이름을 ${textBefore}으로 변경합니다`)
                navi('/redirect');
            } else {
                dispatch(profileAction.nameSetting(textBefore + '으'))
                speech(`이름을 ${textBefore}으로 변경합니다`)
                navi('/redirect');
            }
        }
    } else if(text.includes('나이를')){
        if(text.includes('나이를 변경')){
            if (text.includes('살로 나이를')){
                const parts = text.split('살로 나이를 변경');
                const textBefore = parts[0]
                dispatch(profileAction.ageSetting(textBefore))
                speech(`${textBefore}살로 나이를 변경합니다`)
                navi('/redirect');
            } else if (text.includes('세로 나이를')) {
                const parts = text.split('세로 나이를 변경');
                const textBefore = parts[0]
                dispatch(profileAction.ageSetting(textBefore))
                speech(`${textBefore}세로 나이를 변경합니다`)
                navi('/redirect');
            }
        } else if (text.includes('로 변경')) {
            const parts = text.split('나이를 ')[1];
            if(text.includes('살로 변경')){
                const newParts = parts.split('살로 변경')
                const textBefore = newParts[0]
                dispatch(profileAction.ageSetting(textBefore))
                speech(`나이를 ${textBefore}살로 변경합니다`)
                navi('/redirect');
            } else if (text.includes('세로 변경')){
                const newParts = parts.split('세로 변경')
                const textBefore = newParts[0]
                dispatch(profileAction.ageSetting(textBefore))
                speech(`나이를 ${textBefore}세로 변경합니다`)
                navi('/redirect');
            }
        }
    } else if(text.includes('성별을')) {
        if(text.includes('변경')){
            if(text.includes('남자로')){
                dispatch(profileAction.genderSetting('male'))
                speech(`성별을 남자로 변경합니다`)
                navi('/redirect');
            } else if (text.includes('여자로')){
                dispatch(profileAction.genderSetting('female'))
                speech(`성별을 여자로 변경합니다`)
                navi('/redirect');
            } else if (text.includes('미정으로')){
                dispatch(profileAction.genderSetting('other'))
                speech(`성별을 미정으로 변경합니다`)
                navi('/redirect');
            }
        }
    }
}

const handleGenerateResponse = async (txt,speech) => {
    try {
        const requestBody = {
            model:'gpt-3.5-turbo',
            messages: [{role:'user',content:`${txt}에 대해 간단하게 설명해줘`}],
            max_tokens: 100,
        };
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.REACT_APP_GPT_SECRET_KEY}`,
            },
            body: JSON.stringify(requestBody),
        });

        const responseData = await response.json();
        const speechData = responseData.choices[0].message.content
        speech(speechData)
    } catch (error) {
        console.error('Error:', error);
    }
};

const hasFinalConsonant = (word) => {
    const lastChar = word [ word.length - 1 ];
    return ( lastChar.charCodeAt(0) - 44032 ) % 28 !== 0;
}