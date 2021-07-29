function loop(x) {
    if (x >= 1000000000000)
      return;
    // 어떤 코드
    loop(x + 1);
  }
  loop(0);
  
  // InternalError: too much recursion(너무 많은 재귀 호출)