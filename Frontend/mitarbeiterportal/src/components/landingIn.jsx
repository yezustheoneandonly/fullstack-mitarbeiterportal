
import { Container, Header, Content } from 'rsuite';

import Drawermenue from './drawer';
import ShowEmployee from './showEmployee';
import ShowProjects from './showProjects';

import 'rsuite/dist/rsuite.css';
import '../styles/landinginside.css'

const LandingIn = () => {

    return (

        <div className="inside">
            <Container>
                <Header>
                    <div className='drawerBttn'>
                        <Drawermenue />
                    </div>

                </Header>
                <Content className='inhalt'>
                    <div className='worker'>
                        <ShowEmployee />
                    </div>
                    <div>
                        <ShowProjects />
                    </div>


                </Content>

            </Container>
        </div>

    );
};

export default LandingIn