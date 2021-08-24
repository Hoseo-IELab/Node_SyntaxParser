function errTranslate(err)
{
    // Eval() Error
    if(err.includes('EvalError')){
        return 'Eval 오류: 전역 eval() 함수에 관한 오류.';

    // RangeError
    } else if(err.includes('RangeError')){
        if (err.includes('repeat count must be less than infinity')){
            return '범위 오류: 반복 횟수가 무한대 미만이어야 합니다.';
        } else if (err.includes('precision is out of range')) {
            return '범위 오류: 정밀도가 범위를 벗어났습니다.';
        }
        else return '범위 오류: 숫자 변수나 매개변수가 유효한 범위를 벗어났습니다.';

    // ReferenceError
    } else if(err.includes('ReferenceError')){
        return '참조 오류: 선언된 적이 없는 변수를 참조하려고 합니다.';

    // URIError
    } else if(err.includes('URIError')){
        return 'URI 오류: encodeURI()나 decodeURl() 함수에 부적절한 매개변수를 제공했습니다.';

    // AggregateError
    } else if(err.includes('AggregateError')){
        return '집계 오류: 하나의 동작이 여러 개의 오류를 발생시켰습니다.';

    // InternalError
    } else if(err.includes('InternalError')){
        if (err.includes('too much recursion')){
            return '내부 오류: 너무 많은 재귀';
        }
        else return '내부 오류: JavaScript 엔진의 내부에서 오류가 발생했습니다.';

    // Warning
    } else if(err.includes('Warning')) {
        if (err.includes('unreachable code after return statement')) {
            return '경고: return문 뒤에 도달할 수 없는 코드입니다.'
        }
        return '경고: Warning Error 발생';

    // SyntaxError
    } else if(err.includes('SyntaxError')) {
        if (err.includes('missing ]')){ 
            return '구문 오류: 배열 초기자 구문에 오류가 있습니다. 닫는 대괄호(]) 또는 콤마(,)가 빠진 것 같습니다.';
        } else if (err.includes('missing [')){ 
            return '구문 오류: 배열 초기자 구문에 오류가 있습니다. 여는 대괄호([) 또는 콤마(,)가 빠진 것 같습니다.';
        } else if (err.includes('missing (')){ 
            return '구문 오류: 여는 괄호 ( 또는 콤마(,)가 빠진 것 같습니다.';
        } else if (err.includes('missing )')){ 
            return '구문 오류: 닫는 괄호 ) 또는 콤마(,)가 빠진 것 같습니다.';
        } else if (err.includes('missing = in const declaration')){ 
            return '구문 오류: const 선언에서는 반드시 값을 정의해야 합니다.';
        } else if (err.includes('missing } after property list')){ 
            return '구문 오류: 중괄호 혹은 객체 초기화 과정 중 쉼표가 누락되었습니다.';
        } else if (err.includes('missing ;')){ 
            return '구문 오류: 세미콜론 누락 혹은 Escape 처리되지 않은 문자열이 존재합니다.';
        } else if (err.includes('Unexpected token')){ 
            return '구문 오류: 콤마, 괄호, 수식어 등 오타 관련 오류가 발견되었습니다.';
        } else if (err.includes('missing variable name')){ 
            return '구문 오류: 변수명이 선언되지 않았거나 잘못된 변수명이 발견되었습니다.';
        } else if (err.includes('function statement requires a name')){ 
            return '구문 오류: 함수의 이름 혹은 표현식이 잘못 정의되었습니다.';
        } else if (err.includes('unterminated string literal')){ 
            return '구문 오류: 종료되지 않은 문자열 리터럴 오류 발생';
        } else if (err.includes('use strict not allowed in function with non-simple parameters')){ 
            return '구문 오류: 단순하지 않은 매개변수가 있는 함수에서는 "use strict"가 허용되지 않습니다.';
        }
        else return '구문 오류: 언어의 구문에 맞지 않는 오류 혹은 토큰 오류가 발생했습니다.';

    // TypeError
    } else if(err.includes('TypeError')) {
        if (err.includes('More arguments needed')) {
            return '자료형 오류: 함수 호출 시 에러가 발생했습니다. 더 많은 인수가 주어져야 합니다.';
        } else if (err.includes('Reduce of empty array with no initial value')){
            return '유형 오류: 초기 값이 없는 빈 배열의 감소';
        }
        else return '자료형 오류: 변수나 매개변수가 유효한 자료형이 아닙니다.';

    } 
    else { return err; }
}

function json_parse(jscode, data){
    const codeBuffer = jscode;

    let input = [];
    for(let i=0; i<data.input.items.length; i++){
        let findString = "$" + String(data.input.items[i].name) + " = input['" + String(data.input.items[i].name) + "']";
    
        let err = codeBuffer.indexOf(findString);
        if (err == -1){
            input.push("(1:1 대응 오류) Input 코드에 "+ String(data.input.items[i].name) + " 속성이 없습니다.");
        }
    }
    let output = [];
    for(let i=0; i<data.output.items.length; i++){
        let findString = String(data.output.items[i].name) + ":";
        
        let err = codeBuffer.indexOf(findString);
        if (err == -1){
            output.push("(1:1 대응 오류) Output 코드에 "+ String(data.output.items[i].name) + " 속성이 없습니다.");
        }
    }

    return {
        input: input,
        output: output
    };
}

function err_catch(jscode) {
    const codeString = String(fr);
    
    try {
        eval(codeString);
    }catch(error)
    {
        return errTranslate(String(error));
    }
    return "에러가 없습니다.";
}

export default {
    json_parse,
    err_catch
}