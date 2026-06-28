# Midea Thermostat Card

A modern, **Mushroom-styled** thermostat card for **Midea** air conditioners running on
the [`midea_ac_lan`](https://github.com/wuwentao/midea_ac_lan) integration in
[Home Assistant](https://www.home-assistant.io/).

It keeps the *spirit* of a round thermostat dial as the focal point, surrounded by flat,
compact Mushroom-style controls. Point it at a single `climate` entity and it
**auto-discovers** the device's Midea sub-entities (eco, turbo/boost, sleep, swing, fan
speed, sensors…).

> ⚠️ **Many `midea_ac_lan` sub-entities are disabled by default.** Eco, boost, sleep,
> swing, fan-speed, energy sensors, etc. won't appear until you enable them on the device
> in the integration. In Home Assistant: **Settings → Devices & Services → midea_ac_lan →
> your device → +N entities not shown → enable** the ones you want, then reload the page.

---

## Features

- **Compact round dial** — target temperature, current temperature, HVAC mode, color-coded
  per mode; tap `−`/`+` or drag the handle to set the temperature.
- **HVAC mode chips** — from the climate entity's `hvac_modes`.
- **Quick toggle chips** — eco / boost / sleep (configurable) shown as on/off chips.
- **Collapsible rows** — Fan, Swing and Preset; native `climate` capability is preferred,
  otherwise Midea switches / number / selects are used automatically.
- **Optional sensor footer** — humidity, outdoor temperature, power, energy… **hidden by
  default**, opt-in via `features.sensors`.
- **GUI editor** + full YAML configuration.
- **Localized** — all entity/state text follows your Home Assistant language automatically;
  card labels ship translated for several languages with English fallback for the rest.

---

## Installation

### HACS (recommended)

1. HACS → **Frontend** → menu (⋮) → **Custom repositories**.
2. Add this repository's URL, category **Dashboard** (Lovelace plugin).
3. Install **Midea Thermostat Card**.
4. HACS adds the resource automatically. If not, add it under **Settings → Dashboards →
   Resources**:
   - URL: `/hacsfiles/midea-thermostat-card/midea-thermostat-card.js`
   - Type: **JavaScript Module**

### Manual

1. Copy `dist/midea-thermostat-card.js` to `config/www/`.
2. Add a Lovelace resource:
   - URL: `/local/midea-thermostat-card.js`
   - Type: **JavaScript Module**

---

## Configuration

### Minimal

```yaml
type: custom:midea-thermostat-card
entity: climate.clim_salon
```

Everything else is auto-detected.

### Full

```yaml
type: custom:midea-thermostat-card
entity: climate.clim_salon
name: Clim Salon              # optional, defaults to friendly_name
icon: mdi:air-conditioner     # optional
show_current_as_secondary: true
dial:
  draggable: true
  step: 0.5
features:
  hvac_modes: true
  quick_toggles: [eco_mode, boost_mode, sleep_mode]
  fan: auto                   # auto | climate | number | hidden
  swing: auto                 # auto | climate | switches | hidden
  preset: auto                # auto | climate | switches | hidden
  sensors: []                 # opt-in; e.g. [indoor_humidity, outdoor_temperature, realtime_power]
  extra_switches: []          # e.g. [aux_heating, anion, natural_wind]
```

| Option | Default | Description |
|---|---|---|
| `entity` | — (required) | A `climate.*` entity from `midea_ac_lan`. |
| `name` | friendly name | Card title. |
| `icon` | — | Optional header icon. |
| `show_current_as_secondary` | `true` | Show current temperature under the dial. |
| `dial.draggable` | `true` | Allow dragging the dial handle. |
| `dial.step` | `0.5` | Temperature step for `−`/`+` and drag. |
| `features.hvac_modes` | `true` | Show HVAC mode chips. |
| `features.quick_toggles` | `[eco_mode, boost_mode, sleep_mode]` | Midea switch keys shown as quick chips. |
| `features.fan` / `swing` / `preset` | `auto` | Control source; `auto` prefers native climate, falls back to Midea entities. |
| `features.sensors` | `[]` | Opt-in sensor footer (hidden by default). |
| `features.extra_switches` | `[]` | Additional Midea switches to show as toggles. |

The GUI editor currently covers the core fields (entity, name, icon, current temperature,
and fan/swing/preset source). Advanced lists (`quick_toggles`, `sensors`, `extra_switches`)
can be set via YAML.

---

## Localization

- Entity names, HVAC modes, fan/swing/preset values and sensor states are rendered through
  Home Assistant's own formatters, so they appear in **your HA language automatically**.
- The card's own labels (Fan, Swing, Preset, Sensors, editor fields) ship translated for
  `en, fr, de, es, it, nl, pt-BR, pl`. Any other Home Assistant language falls back to
  English. To add a language, drop a JSON file in `src/localize/languages/` and register it
  in `languages/index.js` — PRs welcome.

---

## Development

```bash
npm install
npm test        # vitest (unit + component + integration)
npm run build   # bundles dist/midea-thermostat-card.js
npm run watch   # rebuild on change
```

Architecture: thin Lit components over pure, unit-tested `core/*` modules
(`midea-detect`, `dial-geometry`, `config`, `hvac-colors`, `ha-actions`).

## License

MIT
