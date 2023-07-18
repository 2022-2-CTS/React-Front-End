import React from "react";

const SignIn = () => {
  return (
    <div class="flex justify-center items-center text-center min-h-screen">
      <div class="">
        <div class="pb-8 font-bold text-2xl">부산시 문화예술 지도</div>
        <div class="grid grid-rows-4 gap-3">
        <input type="text" name="id" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-lg sm:text-sm focus:ring-1 placeholder:text-slate-400 placeholder:text-sm" placeholder="아이디" />
        <input type="text" name="password" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-lg sm:text-sm focus:ring-1 placeholder:text-slate-400 placeholder:text-sm" placeholder="비밀번호" />
          <button class="rounded-lg border-solid border-2 border-indigo-500 bg-indigo-500">
            <p class="font-bold text-white">로그인</p>
          </button>
          <div class="font-light text-black text-sm">
              <span class="text-slate-800">계정이 없으신가요?</span>
              <a href="./signup" class="underline text-indigo-500 font-bold underline-offset-2">회원가입</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;