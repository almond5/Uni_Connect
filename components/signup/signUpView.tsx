import React, { useEffect, useState } from 'react';

const SignUpView = (props: { unis: any }) => {
  const [fName, setFname] = useState('');
  const [lName, setLname] = useState('');
  const [password, setPassword] = useState('');
  const [uniSelected, setUni] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (
      !(
        props.unis === undefined ||
        props.unis === null ||
        props.unis.length === 0
      )
    )
      setUni(props.unis[0].id);
  });

  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const submitUser = async (newUser: {
    userEmail: string | undefined | null;
    password: string | undefined | null;
    uniSelected: string | undefined | null;
    fName: string | undefined | null;
    lName: string | undefined | null;
  }) => {
    const response = await fetch('/api/userCreate', {
      method: 'POST',
      body: JSON.stringify(newUser),
    });
    const data = await response.json();
    if (data !== null) {
      alert(data);
    }
  };

  const handlePassword = async (e: {
    [x: string]: any;
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const newUser = {
      userEmail,
      password,
      uniSelected,
      fName,
      lName,
    };

    await submitUser(newUser);
    await timeout(1000);
    window.location.reload();
    setFname('');
    setLname('');
    setPassword('');
    setUserEmail('');
    setUni('');
  };

  return (
    <div className="flex-col text-center py-24">
      <form onSubmit={handleSubmit}>
        <div
          className="mx-auto max-w-md text-xl text-left xs:max-w-md sm:max-w-md 
        md:max-w-md lg:max-w-md xl:max-w-md 2xl:max-w-md"
        >
          <div className="mb-4 text-lg">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
            >
              First Name:
            </div>
            <input
              maxLength={55}
              value={fName}
              onChange={(e) => setFname(e.target.value)}
              required
              className="block p-2 w-full text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
              rounded-tl-none border-neutral-700 "
            ></input>{' '}
          </div>
          <div className="mb-4 text-lg">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
            >
              Last Name:
            </div>
            <input
              maxLength={55}
              value={lName}
              onChange={(e) => setLname(e.target.value)}
              required
              className="block p-2 w-full text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
              rounded-tl-none border-neutral-700 "
            ></input>{' '}
          </div>
          <div className="mb-4 text-lg">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
            >
              Email:
            </div>
            <input
              maxLength={55}
              value={userEmail}
              type="email"
              onChange={(e) => setUserEmail(e.target.value)}
              required
              className="block p-2 w-full text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
              rounded-tl-none border-neutral-700 "
            ></input>{' '}
          </div>
          <div className="mb-4 text-lg">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
            >
              Password:
            </div>
            <input
              maxLength={55}
              value={password}
              type={visible ? 'text' : 'password'}
              onChange={(e) => handlePassword(e)}
              required
              className="block p-2 w-full text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
              rounded-tl-none border-neutral-700 "
            ></input>{' '}
            <button
              className="mt-1 mx-auto rounded-[0.5rem] border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition text-md bg-neutral-50"
              onClick={() => setVisible(!visible)}
              type="button"
            >
              Toggle Password
            </button>{' '}
          </div>
          <div className="mb-4 text-lg">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
            >
              University:
            </div>
            <div
              className="flex flex-col p-2 w-32 text-md text-gray-900 
              bg-neutral-50 rounded-lg border-[0.175rem] 
                rounded-tl-none border-neutral-700"
            >
              <select
                name="University"
                defaultValue={uniSelected}
                onChange={(e) => {
                  setUni(e.target.value);
                }}
              >
                {props.unis === undefined ||
                props.unis === null ||
                props.unis.length === 0 ? (
                  <div></div>
                ) : (
                  props.unis.map((university: any) => (
                    <option key={university.id} value={university.id}>
                      {university.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
          <div className="py-[32px]">
            <div
              className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition
             bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800"
            >
              <button className="submit"> Submit</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpView;
