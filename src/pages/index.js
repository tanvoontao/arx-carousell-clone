import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

// https://github.com/michalsnik/aos/issues/574

import { Inter } from '@next/font/google'
import { Slider, Button } from "@mui/material";
import Metatags from '@/components/Metatags/Metatags'
import { showAlert, hideAlert, setAlert } from "@/redux/alert/action";
import { useGetUsersQuery } from "@/redux/user/reducer"
import UserLayout from '@/components/Layout/UserLayout';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const alert = { show: true, message: "testing", severity: "error" }
  const { data, isError, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return (<p>Loading from redux ...</p>)
  }
  if (isError) {
    return (<p>Oh no, there was an error</p>)
  }

  return (
    <UserLayout>
      <Metatags title="ARx Official Website" description="ARx Official Website" />

      <main>
        <div
          data-aos="fade-right"
          className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
          <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">Writes Upside-Down</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
          </p>
        </div>

        <button
          onClick={() => hideAlert()}>Hide Alert</button>
        <br />
        <button
          onClick={() => showAlert()}>SHOW Alert</button>
        <br />

        <button
          onClick={() => setAlert(alert)}>Set Alert</button>
        <br />

        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        <Button variant="outlined" >Outlined</Button>

        {data && (<p>{JSON.stringify(data)}</p>)}
      </main>
    </UserLayout>
  )
}
