import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import SVG from 'next/image';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQxODcwOSwiZXhwIjoxOTU4OTk0NzA5fQ.PUS63PyPU7RcofsoLnvyWtcTNKd7K17QuCyVK927kcM'
const supabaseUrl = 'https://bkkykknzdkusixuznkxq.supabase.co'
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

// fetch(`${supabase_url}/rest/v1/mensagens?select=*`, {
//     headers: {
//         'Content-Type': 'application/json',
//         'apikey': 'supabase_anon_key',
//         'Authorization': 'Bearer' + supabase_anon_key,
//     }
// }).then( res => {
//     return res.json
// }).then( response => {
//     console.log(response)
// })

export default function ChatPage() {
    // Sua lógica vai aqui
    const [mensage, setMensage] = React.useState('');
    const [listMensage, setListMensage] = React.useState([])

    React.useEffect(() => {
        supabaseClient
        .from('mensages')
        .select('*')
        .order('id', { ascending: false })
        .then( ({ data }) => {
            if ( data !== null ) {
                setListMensage(data)
            }
        })
    }, [])

    // ./Sua lógica vai aqui
    function handleNewMensage(newMensage) {
      const mensage = {
        de: 'vanessametonini',
        texto: newMensage
      }

      supabaseClient
        .from('mensages')
        .insert([
            mensage
        ])
        .then( ({ data }) => {
            setListMensage([
                data[0],
                ...listMensage
            ])
        })

      setMensage('')
    }

    function handleDeleteMensage(id) {
        supabaseClient
            .from('mensages')
            .delete()
            .match({ id: id })
            .then( response => {
                setListMensage(listMensage.filter( item => item.id !==  id))
            })
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    {/* <MessageList mensages={[]} deleteMensage={handleDeleteMensage} /> */}
                    <MessageList mensages={listMensage} deleteMensage={handleDeleteMensage} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensage}
                            onChange={ event => {
                              setMensage(event.target.value)
                            }}
                            onKeyPress={ event => {
                              if(event.key === 'Enter') {
                                event.preventDefault()
                                handleNewMensage(mensage)
                              }
                            }}
                            placeholder="Insira sua mensage aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                            type="submit"
                            label="Send"
                            onClick={ event => {
                                event.preventDefault()
                                handleNewMensage(mensage)
                            }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                            styleSheet={{
                                alignSelf: 'flex-start',
                                marginTop: '5px',
                                border: '0px',
                                padding: '8px 15px',
                            }}
                            size="lg"
                            variant="primary"
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
  
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            { props.mensages.length === 0 && 
                <Box tag="div"
                     styleSheet={{
                        position: 'relative',
                        height: '50%',
                        top: '-25%'
                     }}
                >
                    <SVG layout="fill"
                        src="/images/react-2.svg"
                        className="transform"/>
                </Box>
            }
            { props.mensages.map( mensage => {
                return (
                    <Text
                        key={mensage.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                                display: 'flex',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensage.de}.png`}
                                onMouseEnter={ event => {
                                    event.target.style.width = '35px';
                                    event.target.style.height = '35px';
                                }}
                                onMouseLeave={ event => {
                                    event.target.style.width = '25px';
                                    event.target.style.height = '25px';
                                }}
                            />
                            <Text tag="strong">
                                {mensage.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                            <Button
                                iconName="times"
                                onClick={ event => {
                                    props.deleteMensage(mensage.id)
                                }}
                                variant='tertiary'
                                colorVariant='neutral'
                                styleSheet={{
                                    width: '25px',
                                    height: '25px',
                                    position: 'absolute',
                                    right: '45px',
                                }}
                            />
                        </Box>
                        {mensage.texto}
                    </Text>
                )
            })}
        </Box>
    )
}
