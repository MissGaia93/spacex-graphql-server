const typeDefs = `#graphql
    type Query {
        launch(id: String!): Launch
        launches(limit: Int, offset: Int, sort: String, keyword: String): [Launch]
        launchpad(id: String!): Launchpad
        launchpads(limit: Int, offset: Int, keywords: [String]): [Launchpad]
        payload(id: String!): Payload
        payloads(limit: Int, offset: Int, sort: String, keywords: [String]): [Payload]
        rocket(id: String!): Rocket
        rockets(limit: Int, offset: Int, keywords: [String]): [Rocket]
    }

    type Flickr_Images {
        type: [String]
    }

    type Launch {
        id: String!
        flight_number: Int!
        name: String!
        date_unix: Int!
        date_local: String!
        date_precision: String!
        static_fire_date_unix: Int
        tdb: Boolean!
        net: Boolean!
        window: Int
        launchpad: Launchpad
        success: Boolean
        failures: [Failures]
        upcoming: Boolean!
        payload: [Payload]
        details: String
        links: Links
        auto_update: Boolean!
        rocket: Rocket
    }

    type Failures {
        time: Int
        altitude: Int
        reason: String
    }

    type Links {
        patch: Patch
        reddit: Reddit
        presskit: String
        webcast: String
        youtube_id: String
        article: String
        wikipedia: String
        flickr: Flickr
    }

    type Patch {
        small: String
        large: String
    }

    type Flickr {
        small: [String]
        original: [String]
    }

    type Reddit {
        campagin: String
        launch: String
        media: String
        recovery: String
    }

    type Launchpad {
        id: String!
        name: String
        full_name: String
        status: String!
        locality: String
        region: String
        timezone: String
        latitude: Float
        longitude: Float
        launch_attempts: Int!
        launch_successes: Int!
    }

    type Payload {
        name: String
        type: String
        id: String!
        reused: Boolean!
        mass_kg: Float
        mass_lbs: Float
        orbit: String
        reference_system: String
        regime: String
        longitude: Float
        semi_major_axis_km: Float
        eccentricity: Float
        periapsis_km: Float
        apoapsis_km: Float
        inclination_deg: Float
        period_min: Float
        lifespan_years: Float
        epoch: String
        mean_motion: Float
        raan: Float
        arg_of_pericenter: Float
        mean_anomaly: Float
        nationalities: [String]
    }

    type Rocket {
        name: String
        type: String
        active: Boolean
        stages: Int
        boosters: Int
        cost_per_launch: Int
        success_rate_pct: Int
        first_flight: String
        country: String
        company: String
        flickr_images: [String]
        wikipedia: String
        description: String
        rocket_id: String
        rocket_name: String
        rocket_type: String
        id: String
    }

    type RocketPayload {
        option_1: String
        option_2: String
    }
`;

export { typeDefs };