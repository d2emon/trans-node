import React, { useEffect, useState } from 'react';
import {
  Card,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import locationAPI from '../services/locationAPI';
import LocationName from './LocationName';

const MODE_SPECIAL = 'SPECIAL';
const MODE_COMMAND = 'COMMAND';

const lisobs = async () => null;
const lispeople = async () => null;
const onlook = async () => null;

const isDarkFor = async (location) => {
  const getItem = async (id) => ({
    id,
    flags: {
      13: false,
    },
    locationId: location.id,
  });
  const getPlayer = async (id) => ({
    id,
    locationId: location.id,
  });
  const getItems = async () => {
    const numobs = 0;
    const loaders = [];
    for (let id = 0; id < numobs; id += 1) {
      loaders.push(getItem(id));
    }
    return Promise.all(loaders);
  };

  //

  const checkItem = async (item) => {
    const ishere = (itemId) => (itemId === location.id);
    const ocarrf = (itemId) => ((itemId === location.id) ? 3 : 0);

    // Is not light
    if ((item.id !== 32) && !item.flags[13]) {
      return true;
    }

    // Is here
    if (ishere(item.id)) {
      return false;
    }

    // Is not carried
    if ([0, 3].includes(ocarrf(item.id))) {
      return false;
    }

    // Owner is here
    const owner = await getPlayer(item);
    return (owner.locationId === location.id);
  };

  //

  const items = await getItems();
  const check = await Promise.all(items.map(checkItem));
  return !check.any((item) => !!item);
};

function ListObjects() {
  return <p>{lisobs()}</p>;
}

function ListPeople() {
  return <p>{lispeople()}</p>;
}

function LocationCardFooter(props) {
  const {
    mode,
  } = props;

  return (
    <>
      <ListObjects />
      { (mode === MODE_COMMAND) && <ListPeople /> }
      <br />
    </>
  );
}

LocationCardFooter.defaultProps = {
  mode: MODE_SPECIAL,
};

LocationCardFooter.propTypes = {
  mode: PropTypes.oneOf([MODE_SPECIAL, MODE_COMMAND]),
};

function BlindLocationCardBody() {
  return (
    <Card.Body>
      <Card.Text>
        You are blind... you can&apos;t see a thing!
      </Card.Text>
    </Card.Body>
  );
}

function DarkLocationCardBody() {
  return (
    <Card.Body>
      <Card.Text>
        It is dark
      </Card.Text>
    </Card.Body>
  );
}

function LocationCard(props) {
  const {
    isBrief, // brmode
    isGod, // my_lev > 9999
    isWizard, // my_lev > 9
    locationId,
    mode, // curmode
    onDeath,
    userIsBlind, // ail_blind
  } = props;

  const [isBlind, setIsBlind] = useState(userIsBlind);
  const [isDeathRoom, setIsDeathRoom] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [location, setLocation] = useState(null);

  const checkDark = async (data) => {
    if (!data.isDark) {
      return false;
    }

    if (isWizard) {
      return false;
    }

    return isDarkFor(data);
  };

  const load = async () => {
    // SAVE WORLD DATA
    const data = await locationAPI.load(locationId, isBrief);
    const dark = await checkDark(data);

    setIsDark(dark);
    setIsDeathRoom(data.isDeathRoom);
    setLocation(data);

    // After show
    // LOAD WORLD DATA
    onlook();
  };

  useEffect(() => {
    load();
  }, [locationId]);

  useEffect(() => {
    if (!isDeathRoom) {
      return;
    }

    setIsBlind(false);
    setIsDark(false);

    if (isWizard) {
      return;
    }

    if (!onDeath) {
      return;
    }

    onDeath('bye bye.....');
    // Loose with message
  }, [isDeathRoom]);

  if (!location) {
    return null;
  }

  if (isBlind) {
    return <BlindLocationCardBody />;
  }

  if (isDark) {
    return <DarkLocationCardBody />;
  }

  return (
    <Card>
      <LocationName
        location={location}
        showLocationId={isGod}
        showPublicId={isWizard}
      />

      <Card.Body>
        <Card.Text>
          {location.text}
        </Card.Text>
      </Card.Body>

      <Card.Footer>
        <LocationCardFooter
          mode={mode}
        />
      </Card.Footer>
    </Card>
  );
}

LocationCard.defaultProps = {
  locationId: null,
  userIsBlind: false,
  isBrief: false,
  isGod: false,
  isWizard: false,
  mode: MODE_SPECIAL,
  onDeath: null,
};

LocationCard.propTypes = {
  locationId: PropTypes.string,
  userIsBlind: PropTypes.bool,
  isBrief: PropTypes.bool,
  isGod: PropTypes.bool,
  isWizard: PropTypes.bool,
  mode: PropTypes.oneOf([MODE_SPECIAL, MODE_COMMAND]),
  onDeath: PropTypes.func,
};

export default LocationCard;
