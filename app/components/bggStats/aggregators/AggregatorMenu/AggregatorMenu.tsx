import { Menu, Switch } from "@headlessui/react";
import { Settings, Dots } from "../../icons";
import { baseStyles, smallBaseStyles, openMenuStyles } from "../../styles";

type Props = {
  settings: string[];
  setSettings: (settings: string[]) => void;
};

type Option = { value: string; label: string };

export default function AggregatorMenu({ settings, setSettings }: Props) {
  const settingOptions: Option[] = [
    { value: "daysPlayed", label: "# Days Played" },
    { value: "players", label: "Players" },
    { value: "locations", label: "Locations" },
    { value: "recordedPlays", label: "Total Plays" },
    { value: "playCount", label: "# Plays By Date" },
  ];

  const handleChange = (option: string, value: boolean) => {
    let optionInSettings = settings.includes(option);

    if (optionInSettings) {
      let newSettings = settings.filter((setting) => setting !== option);
      setSettings(newSettings);
    } else {
      let newSettings = [...settings, option];
      setSettings(newSettings);
    }
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        className={`text-white opacity-50  hover:opacity-100 transition-all`}
      >
        <Dots width={24} />
        <span className="sr-only">Chart Options</span>
      </Menu.Button>

      <Menu.Items
        className={`absolute left-0 flex flex-col gap-4 p-4 rounded-md border-[1px] border-slate-400 bg-slate-100 shadow-md shadow-slate-500/40  z-10  w-max`}
      >
        {settingOptions.map((option) => {
          const enabled = settings.includes(option.value);

          return (
            <Menu.Item
              key={option.value}
              as="div"
              className="flex gap-4 font-medium"
            >
              <Switch
                checked={enabled}
                onChange={(newVal: boolean) =>
                  handleChange(option.value, newVal)
                }
                className={`${
                  enabled ? "bg-blue-600" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable {option.label}</span>
                <span
                  className={`${
                    enabled ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
              {option.label}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
}
