const errorList = [
    {
        e: 'SyntaxError: missing ] after element list',
        desc: '대괄호가 없습니다. 대괄호 여부를 확인해주세요.'
    },

    {
        e: 'TypeError: invalid Array.prototype.sort argument',
        desc: 'sort 배열의 인수가 정의되지 않았거나 피연산자와 비교하는 함수 입니다.'
    },

    {
        e: 'Warning: -file- is being assigned a //# sourceMappingURL, but already has one',
        desc: 'sort 배열의 인수가 정의되지 않았거나 피연산자와 비교하는 함수 입니다.'
    },

    {
        e: 'RangeError: radix must be an integer',
        desc: 'Number.prototype.toString()과 BigInt.prototype.toString() 에 사용자되는 인수는 2~36 사이의 정수여야 합니다.'
    },

    {
        e: 'SyntaxError: invalid regular expression flag',
        desc: '코드에 잘못된 정규식 플래그가 있습니다. g, i, m, s, u, y 중 하나만 사용해 주십시오.'
    },

    {
        e: 'SyntaxError: return not in function',
        desc: '리턴값이 함수가 아닙니다. 중괄호 확인 및 반환값을 확인해 주세요.'
    },

    {
        e: 'TypeError: X.prototype.y called on incompatible type',
        desc: '주어진 객체에 일치하지 않는 유형의 호출이 있습니다.'
    },

    {
        e: "ReferenceError: can't access lexical declaration",
        desc: '어휘 변수가 초기회 되기 전에 액세스 되었습니다.(let 또는 const 중복 선언됨)'
    },

    {
        e: "TypeError: can't access property",
        desc: 'x가 정의되지 않았습니다. x가 null 혹은 undefined인지 확인해주세요.'
    },

    {
        e: "TypeError: can't assign to property",
        desc: 'x가 객체로 선언되지 않았습니다. x에 대한 객체 선언을 해주십시오.'
    },

    {
        e: 'RangeError: invalid date',
        desc: '유효하지 않은 날짜 문자열이 Date 또는 Date.parse()에 제공되었습니다.'
    },

    {
        e: 'SyntaxError: test for equality (==) mistyped as assignment (=)?',
        desc: '같음(==)이 할당(=)으로 잘못 입력되었습니다.'
    }
]