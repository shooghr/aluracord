import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    // Sua lógica vai aqui
    const [mensage, setMensage] = React.useState('');
    const [listMensage, setListMensage] = React.useState([])

    // ./Sua lógica vai aqui
    function handleNewMensage(newMensage) {
      const mensage = {
        id: listMensage.length + 1,
        of: 'vanessametonini',
        text: newMensage
      }

      setListMensage([
        mensage,
        ...listMensage
      ])
      setMensage('')
    }

    function handleDeleteMensage(id) {
        console.log(id)
        setListMensage(
            listMensage.filter( mensage => mensage.id != id)
        )
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

                    {/* <MessageList mensagens={[]} /> */}
                    <MessageList mensages={listMensage}  deleteMensage={handleDeleteMensage} />

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
    console.log('MessageList', props);
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
                                src={`https://github.com/vanessametonini.png`}
                            />
                            <Text tag="strong">
                                {mensage.of}
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
                                    event.preventDefault()
                                    console.log(props)
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
                        {mensage.text}
                    </Text>
                )
            })}
        </Box>
    )
}
