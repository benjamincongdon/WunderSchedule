# WunderSchedule
  [![npm version](https://badge.fury.io/js/wunderschedule.svg)](https://badge.fury.io/js/wunderschedule)
  [![Build Status](https://travis-ci.org/bcongdon/WunderSchedule.svg?branch=master)](https://travis-ci.org/bcongdon/WunderSchedule)
  [![Code Climate](https://codeclimate.com/github/bcongdon/WunderSchedule/badges/gpa.svg)](https://codeclimate.com/github/bcongdon/WunderSchedule)
  >:clock3: Enhanced Wunderlist task scheduling for power users

WunderSchedule is a Node.JS module that allows you to greatly extend the due date and reminder systems of Wunderlist. WunderSchedule allows you to:
  * Schedule starting times for todos, to reduce *'task list paralysis'*
  * Setup repeating tasks with finer granularity (ever wanted to schedule a task for *just* weekdays?)

## Installation
1. Install with `npm install -g wunderschedule`.
2. Go to the [Wunderlist Developer Portal](https://developer.wunderlist.com/apps) and register an app. Take note of your `Client ID`. Click `Create Access Token` and record the resulting token.
3. Run `wunderschedule auth` and paste in your `Client ID` and `Access Token`.

## Usage
1. Run `wunderschedule` once in the command line and do `Ctrl-C` to kill it. This will create a list called `scheduled` in your Wunderlist account. (Alternatively, just created a list entitled `scheduled`)
2. Add tasks in the `scheduled` lists to schedule todos. Wunderschedule uses special tags that you enter into the 'note' section of the tasks to allow you to schedule upcoming todos. The task's title will be maintained as the title of the resulting todo. 
3. Run `wunderschedule` and let it continue running in the background. Every minute, it will check the `scheduled` list and create tasks defined by the template tasks if necessary.

### Example
Suppose I want to remind myself every Friday afternoon to take out the trash.
  1. Create a task called `Take out the Trash` in the `scheduled` list.
  2. In the 'Note' section of the task, enter:

      ```
      due-date: Friday
      start-time: 4pm
      repeat-every: Friday
      ```
  3. When I leave `wunderschedule` running, on Friday I will receive a todo in my inbox at 4pm with the title `Take out the Trash`. Furthermore, this task will be created by `wunderschedule` every Friday.

**Note:** Do not put any data in the native Wunderlist 'Due Date' or 'Remind Me' fields in template tasks. While this will not disrupt the functionality of Wunderschedule, it is unnecessary and defeats the purpose of Wunderschedule.

## Tags
|Tag            |Effect                                                                              |Alt. Tags
|---------------|------------------------------------------------------------------------------------|---------------|
|`start-time:`* |Defines the time (on due date) at which the scheduled task will appear in your todo.|`start:`, `s:` |
|`due-date:`    |Sets the due date in the resulting todo and gates the day when the todo is created. |`due:`, `d:`   |
|`repeat-every:`|Defines when the task should be repeated.                                           |`repeat:`, `r:`|
|`list:`        |The name of the list you want the task to appear in. Defaults to `inbox`.           |`l`            |
|`starred:`     |Whether or not the resulting task should be starred. (No parameters needed)         |`star`         |
|`note:`        |Note to be added to the resulting task.                                             |`n`            |
|`reminder:`    |Time to set the Wunderlist reminder for created task                                |`rem`, `remind`|

(\* = Required)

### Example Inputs
`start-time`, `due-date`: 
  * All times / dates are parsed with [DateJS](http://www.datejs.com/), which has a handy validation tool on their homepage. If your input parses with that test, then it should work in Wunderschedule.

`repeat-every`:
  * Example inputs: Multiple days of week can be specified space-separated (i.e. `Monday Wednesday Friday` is valid). Time units like `day`, `week`, `month`, and `year` are valid, as are scaled versions of these (i.e. `3 days`)

### Miscellany
* Semicolons can be used as linebreaks in a task template.
	* e.g: `due:today;start:4pm` is a valid - though hard to parse - template note.

## Attribution
* Thanks to [Wunderline](https://github.com/wayneashleyberry/wunderline) for their well documented code. A good portion of Wunderschedule's implementation was inspired by Wunderline.
