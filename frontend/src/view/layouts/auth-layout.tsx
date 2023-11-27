/* eslint-disable jsx-a11y/alt-text */
import { Outlet } from 'react-router-dom';

// import illustration from '../../assets/illustration.png';
import slantedGradient from '../../assets/slanted-gradient.svg';
import { Logo } from '../components/logo';

export function AuthLayout() {
  return (
    <div className="flex w-full h-full">
      <div className="w-full h-full flex justify-center items-center flex-col gap-16 lg:w-1/2">
        <Logo className="h-6 text-gray-500" />

        <div className="w-full max-w-[504px] px-8">
          <Outlet />
        </div>
      </div>

      <div className="w-1/2 h-full max-h-[960px] justify-center items-center p-8 relative hidden lg:flex">
        <img
          src={slantedGradient}
          className="object-cover w-full h-full max-w-[656px] max-h-[960px] select-none rounded-[32px]"
        />

        <div className="max-w-[656px] bottom-8 mx-8 bg-white p-10 absolute rounded-b-[32px] border border-b-violet-950 border-x-violet-950">
          <Logo className="text-violet-950 h-8" />

          <p className="text-gray-700 font-medium text-xl mt-6">
            Gerencie suas finanças pessoais de uma forma simples com o finance app, e o melhor,
            totalmente de graça!
          </p>
        </div>
      </div>
    </div>
  );
}
