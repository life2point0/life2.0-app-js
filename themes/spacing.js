const spacing = {
    logo: {
        width: 120,
        resizeMode: 'contain'
    },
    backButton: {
        position: 'absolute',
        left: 0,
        top: 0
    },
    home: {
        container: {
            paddingVertical: 20,
            flexDirection: 'column',
            gap: 20
        },
        section: {
            marginHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10
        },
        sliderContainer: {
            marginTop: 10
        },
        searchIcon: {
            height: 40,
            width: 40
        }
    },
    appBar: {
        menuIcon: {
            width: 24,
            height: 24
        },
        avatar: {
            size: 30
        }
    },
    communities: {
        slider: {
            card: {
                container: {
                    paddingTop: 5,
                    marginLeft: 16, 
                    backgroundColor: '#fff',
                    shadowColor: '#efefef',
                    shadowOffset: {width: 4, height: 4},
                    shadowOpacity: 1,
                    borderRadius: 4
                },
                content: {
                    flexDirection: 'row', 
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 8
                },
                avatar: {
                    width: 64, 
                    height: 64, 
                    backgroundColor: '#fff' 
                },
                footer: {
                    backgroundColor: '#F2FFF2',  
                    borderRadius: 8,
                    flexDirection: 'row',
                    alignItems: 'center' ,
                    justifyContent: 'space-between',
                    padding: 8
                },
                footerButton: {
                    lineHeight: 15,
                    fontWeight: '400'
                }
            }
        },
        screen: {
            container: {
                margin: 20,
                flexDirection: 'column',
                gap: 10
            },
            section: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 16
            },
            card: {
                container: {
                    paddingTop: 5,
                    marginBottom: 16,
                    backgroundColor: '#fff',
                    shadowColor: '#efefef',
                    shadowOffset: {width: 4, height: 4},
                    shadowOpacity: 1
                },
                content: {
                    flexDirection: 'row', 
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 8
                },
                avatar: {
                    width: 64, 
                    height: 64, 
                    backgroundColor: '#fff' 
                },
                footer: {
                    backgroundColor: '#F2FFF2',  
                    borderRadius: 8,
                    flexDirection: 'row',
                    alignItems: 'center' ,
                    justifyContent: 'space-between',
                    padding: 8
                },
                footerButton: {
                    lineHeight: 15,
                    fontWeight: '400'
                }
            }
        }
    },
    onboarding: {
        container: {
            paddingHorizontal: 20,
            paddingVertical: 20,
            alignItems: 'center',
            minHeight: '100%',
            overflowY: 'auto',
            position: 'relative',
            gap: 20
        },
        headerContainer: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            height: 50
        },
        textContainer: {
            width: '80%',
            textAlign: 'center'
        },
        image: {
            width: 200, 
            height: 200, 
            resizeMode: 'contain'
        },
        loginLinkContainer: {
            alignItems: 'center',
            flexDirection: 'row',
            gap: 5,
            paddingBottom: 50
        }
    }
} 

export { spacing }