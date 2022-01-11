const { Events } = require("../models");

const getAllEvents = async (req, resp) => {
  try {
    const [results] = await Events.findManyWithAssets();
    const events = [];
    // on parcours results pour les réorganiser
    results.forEach((event) => {
      // si aucun event parcouru(1ere boucle) ou si l'id de l'event précédent est != de l'event parcouru (c'est pas le meme event)
      if (events.length === 0 || event.id !== events[events.length - 1].id) {
        // on recrée un objet avec les propriétés qu'on veut récupérer
        const eventWithAssets = {
          id: event.id,
          type: event.type,
          title: event.title,
          places: event.places,
          description: event.description,
          assets: [{ source: event.source, type: event.asset_type }],
        };
        // on envoie ce nouvel objet dans notre tableau à chaque boucle
        events.push(eventWithAssets);
      } else {
        // si l'event a déjà été parcouru on ajoute l'asset à la propriété asset précédente (le cas ou l'event a plusieurs assets)
        events[events.length - 1].assets.push({ source: event.source, type: event.asset_type });
      }
    });
    resp.json(events);
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

const getEventsByType = async (req, resp) => {
  const { type } = req.params;
  try {
    const [results] = await Events.findEventsByType(type);
    const events = [];
    // on parcours results pour les réorganiser
    results.forEach((event) => {
      // si aucun event parcouru(1ere boucle) ou si l'id de l'event précédent est != de l'event parcouru (c'est pas le meme event)
      if (events.length === 0 || event.id !== events[events.length - 1].id) {
        // on recrée un objet avec les propriétés qu'on veut récupérer
        const eventWithAssets = {
          id: event.id,
          type: event.type,
          title: event.title,
          places: event.places,
          description: event.description,
          assets: [{ source: event.source, type: event.asset_type }],
        };
        // on envoie ce nouvel objet dans notre tableau à chaque boucle
        events.push(eventWithAssets);
      } else {
        // si l'event a déjà été parcouru on ajoute l'asset à la propriété asset précédente (le cas ou l'event a plusieurs assets)
        events[events.length - 1].assets.push({ source: event.source, type: event.asset_type });
      }
    });
    resp.json(events);
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

const getOneEventById = async (req, resp) => {
  const id = req.params.id ? req.params.id : req.event_id;
  const statusCode = req.method === "POST" ? 201 : 200;

  let eventsResult;
  let assetsResult;
  try {
    [eventsResult] = await Events.findOneEventById(id);
    console.log(eventsResult);
  } catch (err) {
    resp.status(500).send(err.message);
  }
  try {
    [assetsResult] = await Events.findAssetsByEventId(id);
    console.log(assetsResult);
  } catch (err) {
    resp.status(500).send(err.message);
  }
  if (eventsResult.length === 0) {
    resp.status(404).send(`Event avec l'id ${id} non trouvé`);
  } else if (assetsResult.length === 0) {
    resp.status(statusCode).json(eventsResult[0]);
  } else {
    eventsResult[0].assets = assetsResult;
    resp.status(statusCode).json(eventsResult[0]);
  }
};

const getAssetsByEventId = async (req, resp) => {
  const { id } = req.params;
  try {
    const [results] = await Events.findImagesByEventId(id);
    resp.json(results);
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

const createOneEvent = async (req, res, next) => {
  try {
    const [result] = await Events.createOne(req.body);
    req.event_id = result.insertId;
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteOneEvent = async (req, res) => {
  const event_id = req.params.id;
  try {
    const [result] = await Events.deleteOneById(event_id);
    if (result.affectedRows === 0) {
      res.status(404).send(`Évènement avec l'event_id ${event_id} non trouvé`);
    } else {
      res.status(200).send(`Évènement ${event_id} supprimé`);
    }
  } catch (err) {
    res.status(500).send(`Erreur lors de la suppression de l'évènement`);
  }
};

const updateOneEventById = async (req, resp, next) => {
  const { id } = req.params;
  const { type, title, places, description } = req.body;
  const newEvent = {};
  if (type) {
    newEvent.type = type;
  }
  if (title) {
    newEvent.title = title;
  }
  if (places) {
    newEvent.places = places;
  }
  if (description) {
    newEvent.description = description;
  }
  try {
    await Events.updateOne(newEvent, parseInt(id, 10));
    next();
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

module.exports = {
  getAllEvents,
  getOneEventById,
  createOneEvent,
  deleteOneEvent,
  updateOneEventById,
  getAssetsByEventId,
  getEventsByType,
};
