# Run on MacOS

## Prerequisites
### Zenrows API KEY
This project uses ZenRows to bypass Allegro’s anti‑bot protections.
Create an account here [zenrows](https://app.zenrows.com), get your API key and store in your `.zshrc` export.

```bash
export ZENROWS_API_KEY="your_zenrows_api_key"
```

### Homebrew 
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### rbenv and ruby-build
I found it problematic to use builtin MacOS ruby, rbenv should handle 'virtual' dev env in some static ruby folder

```bash
brew install rbenv ruby-build
```

### Update ~/.zshrc
This will init ruby's 'virtual' dev env on terminal emulator boot.

```bash
eval "$(rbenv init - zsh)"
```

## Source ~/zsh.rs
Reload config.
```bash
source ~/.zshrc
```

Or restart your terminal emulator.

## Install Ruby 3.3 into dev env
### Install
Install Ruby 3.3.0 with rbenv and set it as local environment.
```bash
rbenv install 3.3.0
rbenv local 3.3.0
```

### Check version
Just to be sure you are using the correct Ruby.
```bash
ruby -v
```

## Build
### Install bundler
Get the bundler.
```bash
gem install bundler
```

### Install
Install gems from Gemfile.
```bash
bundle install
```

## Run
### Run
Run the app using bundle exec.
```bash
bundle exec ruby main.rb
```

## Storage
[storage.zip](storage.zip) contains prefetched HTML and parsed JSON output of the [https://allegro.pl/listing?string=laptop](https://allegro.pl/listing?string=laptop)
Unpack it to skip the need to call Craweler::fetch("laptop") if you don't want to use zenrows.