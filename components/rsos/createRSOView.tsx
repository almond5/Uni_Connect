import React, { useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import { DatePicker, DateTimePicker, DesktopTimePicker, LocalizationProvider, MobileDateTimePicker, StaticTimePicker, TimePicker } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import prisma from '../../lib/prismadb';

import { User } from '@prisma/client';

const RSOCreateView = (props: {user: any, findUser: any}) => {
    const [name, setName] = useState('');
    const [members, setMembers] = useState<string[]>([]);
    const [admin, setAdmin] = useState<User>();
    const [member, setMember] = useState('');
    const [memberErr, setMemberErr] = useState('');
    const user = props.user[0];
    const findUserInDB = props.findUser;

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

    

     const handleAddMems = async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      const res = findUserInDB(member)
      //check if entered member in db
      if(await res === -1){
        //user not in db
        setMemberErr("This email does not belong to a user!");
      }
      else{
        setMembers([...members, member]);
        setMember('');
      }
     };

     const timeout = (delay: number) => {
        return new Promise((res) => setTimeout(res, delay));
      };

     const submitEvent = async (rso: {
        name: string | undefined | null;
        members: string[] | undefined | null;
        userId: string | undefined | null;
        admin: User |undefined | null;
      }) => {
        const response = await fetch('/api/rsoCreate', {
          method: 'POST',
          body: JSON.stringify(rso),
        });
    
        const data = await response.json();
        console.log(data);
      };

      // const createMembers = async () => {

      // }

     const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
       // setAdmin(user);
        // const userId = '';
        // console.log(user)

        const userId = user.id;
        setAdmin(props.user)

        const rso = { name, members, userId, admin };
        await submitEvent(rso);
        await timeout(1000);
        window.location.reload();
        setName('');
        
      };

     return (
        <div className="flex-col text-center py-24">
            <form >
                <div className="mx-auto max-w-md text-xl text-left xs:max-w-md sm:max-w-md md:max-w-md lg:max-w-md xl:max-w-md 2xl:max-w-md">
                  <div className="mb-4 text-lg">
                    <div className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg">
                        Title:
                    </div>
                    <textarea
                        maxLength={30}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        rows={1}
                        cols={1}
                        className="block p-2.5 w-full text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
                        rounded-tl-none border-neutral-700 "
                    ></textarea>{' '}
                    </div>
                  <div className="mb-4 text-lg">
                    <div className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                    border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg" >
                      Member Email:
                    </div>
                    <textarea
                      maxLength={30}
                      value={member}
                      onChange={(e) => setMember(e.target.value)}
                      rows={1}
                      cols={1}
                      className="block p-2.5 w-full text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
                      rounded-tl-none border-neutral-700 "
                    ></textarea>{' '}
                    {memberErr && <div className="error"> {memberErr}</div>}
                    <div>
                      <button onClick={handleAddMems}
                      >
                       <div
                      className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition
                      bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800"
                      >
                      Add Member
                    </div>
                      </button>
                    </div> 
                  </div>
                    <div className="mb-4 text-lg">
                      <div className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg">
                          Currently Selected Members:
                      </div>
                      <div className="block p-2.5 w-full text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
                      rounded-tl-none border-neutral-700 ">
                      {members.map((mem: any, index) => (
                       <div key={index}>
                          {mem}
                        </div>
                      ))}
                      </div>
                    </div>
                </div>
                <div className="py-[32px]">
                  <button type = "submit" onClick={handleSubmit}>
                    <div
                      className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition
                      bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800"
                      >
                      Submit
                    </div>
                  </button>
                </div>
              </form>
          </div>
      );

}

export default RSOCreateView;