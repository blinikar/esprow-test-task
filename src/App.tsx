import { useMantineTheme, AppShell } from '@mantine/core';

import { DropZone } from './components/drop-zone';
import { Header } from './components/header';
import { Search } from './components/search';
import { Editor } from './components/editor';

import './App.css'

import { useLogic } from './hooks/use-logic';

function App() {
  const { 
    dropZone,
    editor,
    header,
    search,
    root: {
      shouldShowForm,
      shouldSearchBeOpened,
    } 
  } = useLogic();

  const theme = useMantineTheme();

  return (
    <div>
      {
        shouldShowForm && (
          <DropZone {...dropZone} />
        )
      }
      {
        !shouldShowForm && ( 
          <AppShell
            padding="md"
            header={{ height: 60 }}
            navbar={{
              width: 300,
              breakpoint: 'sm',
              collapsed: { desktop: !shouldSearchBeOpened, mobile: !shouldSearchBeOpened },
            }}
          >
            <AppShell.Header>
              <Header {...header} />
            </AppShell.Header>

            <AppShell.Navbar>
              <Search {...search} />
            </AppShell.Navbar>

            <AppShell.Main w='100%'>
              <Editor {...editor} />
            </AppShell.Main>
          </AppShell>
        )
      }
    </div>
  )
}

export default App
