import { FC } from "react";
import styled from 'styled-components';
import { GiHamburgerMenu } from "react-icons/gi/index";
import { AiFillGithub } from "react-icons/ai/index";
import { IoMdNotificationsOutline } from "react-icons/io/index";


const AppShell:FC<any> =() =>{
    return (
      <div className="shell">
        <header className="header">
          <button className="icon">
            <GiHamburgerMenu />
          </button>
          <button className="icon">
            <AiFillGithub />
          </button>
          <button className='icon'>
            <span className='circle-unread' />
            <IoMdNotificationsOutline />
          </button>
        </header>
        <style jsx={true} global>
          {`
            body {
              margin: 0px;
              background-color: #06090f;
              --color-header-bg: #161b22;
              max-width: 100%;
            }
            .shell {
              overflow-y: hidden;
            }
            .header {
              padding: 20px;
              background-color: var(--color-header-bg);
              display: flex;
              justify-content: space-between;
            }
            .icon {
              background-color: inherit;
              border: none;
              font-size: 23px;
            }
            button.circle-unread{
              border: 2px solid var(--color-header-bg);
              border-radius: 50%;
              height: 14px;
              background-image: linear-gradient(#54a3ff,#006eed);
            }
          `}
        </style>
      </div>
    );
} 

export { AppShell };