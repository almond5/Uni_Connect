import React, { useEffect, useState } from 'react';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleMapView from '../googleMapView';
import { useSession } from 'next-auth/react';

const SignUpView = (props: { unis: any }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [password, setPassword] = useState('');
  const [uniSelected, setUni] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const { data: sesh } = useSession();

  // useEffect(() => {
  //   if (
  //     !(
  //       props.unis === undefined ||
  //       props.unis === null ||
  //       props.unis.length === 0
  //     )
  //   )
  //     setUni(props.unis[0].id);

  //   if (
  //     !(
  //       props.rsos === undefined ||
  //       props.rsos === null ||
  //       props.rsos.length === 0
  //     )
  //   )
  //     setRso(props.rsos[0].id);
  // });

  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let value = event.target.value;
    setType(value);
  };

  const fontFamily = 'system-ui';
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            fontFamily,
          },
        },
      },
    },
  });

  const submitEvent = async (event: {
    title: string | undefined | null;
    body: string | undefined | null;
    type: string | undefined | null;
    date: Date | undefined | null;
    phoneNumber: string | undefined | null;
    lat: number | undefined | null;
    lng: number | undefined | null;
    addr: string | undefined | null;
    uniSelected: string | undefined | null;
    rsoSelected: string | undefined | null;
    approved: string | undefined | null;
    userEmail: string | undefined | null;
  }) => {
    const response = await fetch('/api/eventCreate', {
      method: 'POST',
      body: JSON.stringify(event),
    });

    const data = await response.json();

    window.location.reload();
    setTitle('');
    setUni('');
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (date === null) setDate(new Date());
    const approved = 'TRUE';

    const newUser = {
      title,
      body,
      type,
      date,
      uniSelected,
      approved,
      userEmail,
    };
    // await submitEvent(newUser);
    await timeout(1000);
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
              Email:
            </div>
            <textarea
              maxLength={30}
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
              rows={1}
              cols={1}
              className="block p-2 w-full text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
              rounded-tl-none border-neutral-700 "
            ></textarea>{' '}
          </div>

          <div className="mb-4 text-lg">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
            >
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
              {/* <select
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
              </select> */}
            </div>
          </div>
          <div className="py-[32px]">
            <div
              className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition
             bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800"
            >
              Submit
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpView;
