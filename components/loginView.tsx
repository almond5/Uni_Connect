import { signIn, getProviders } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';



const LoginView = (props: {providers: any}) => {
  const providers = props.providers;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('******');

  const handleSignIn = () =>{
    signIn("credentials", { username: email, password: password});
   }

  console.log(providers);
  return (
    <div className="py-10">
      <div
        className="mx-auto rounded-[2rem] w-max border-[0.25rem] border-neutral-700 px-16 
        py-2 font-bold transition bg-neutral-50 hover:text-gray-800 text-Lg flex flex-col
        text-center"
      >
        <div className="flex flex-col py-8 font-semibold text-3xl">
          Term Project
        </div>
        <div>
          <div className="mb-4 text-lg">
            <div className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                    border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg">
                Email:
            </div>
            <textarea
              maxLength={30}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              rows={1}
              cols={1}
              className="block p-2 w-full text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
              rounded-tl-none border-neutral-700 "
            ></textarea>{' '}
          </div>
          <div className="mb-4 text-lg">
            <div className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                    border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg">
              Password:
            </div>
            <textarea
                maxLength={30}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                rows={1}
                cols={1}
                className="block p-2 w-full text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
                        rounded-tl-none border-neutral-700 "
            ></textarea>{' '}
          </div>
          <div className="mx-auto rounded-full w-max border-[0.175rem] border-neutral-700 
                  px-4 py-2 font-bold transition hover:bg-neutral-400 hover:text-gray-800 text-Lg">
                     <button onClick={() => handleSignIn()}>                     
                     
                     Sign-in Using Email
                      </button>
            </div>
        </div>
        <div className="py-2"></div>
        Or
        <div className="py-2"></div>
        <div className="mx-auto rounded-full w-max border-[0.175rem] border-neutral-700 
          px-4 py-2 font-bold transition hover:bg-neutral-400 hover:text-gray-800 text-Lg">
            <Link
              href="/api/auth/signin"
              onClick={(e) => {
                e.preventDefault();
                signIn('google-login');
              }}>
              Sign-in Using Google
            </Link>
          </div>
          </div>
  
               
               
          {/* <Link
            href="/api/auth/signin"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
            className="mx-auto rounded-full w-max border-[0.175rem] border-neutral-700 
            px-4 py-2 font-bold transition hover:bg-neutral-400 hover:text-gray-800 text-Lg"
          >
            Sign-in
          </Link> */}
        
        <div className="py-[8px]">
          {/* <button onClick={handleSignUp()}>
            Sign Up
          </button> */}
          
        </div>
        <div className="py-2"></div>
      </div>
  );
}

export default LoginView;

