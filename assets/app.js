<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tutor App</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>

<body class="bg-light container">
    <header class="mt-5">
        <h2 class="text-center">Tutor App</h2>
        <p class="text-center">Welcome Chris</p>
        <div id="loading-spinner" class="d-block mx-auto spinner-border text-primary" role="status"></div>
        <h1 id="todays-date" class="text-center"></h1>
    </header>
    <hr>
    <section class="row">
        <nav class="col-xs-12 col-sm-12 col-md-3 col-lg-3 mt-5 order-2 order-xs-2 order-sm-2 order-md-1 order-lg-1">
            <ul class="row mx-auto bg-dark p-0">
                <div class="mb-2 mt-3">
                    <li id="add-booked-session" class="text-center col-12 btn btn-success">Add Booked Session</li>
                </div>
                <div class="mb-2">
                    <li id="complete-tutor-session" class="text-center col-12 btn btn-info">Log Tutor Hour</li>
                </div>
                <div class="mb-2">
                    <li id="complete-grading-session" class="text-center col-12 btn btn-info">Log Grading Hour
                    </li>
                </div>
                <div class="mb-2">
                    <li id="set-booked-sessions" class="text-center col-12 btn btn-primary">Setup Weeks Hours</li>
                </div>
                <div class="mb-3">
                    <li id="clear-all-data" class="text-center col-12 btn btn-danger">Clear All Data</li>
                </div>
            </ul>
            <section class="bg-dark text-white p-2">
                <p>Graded Sessions This Session: <span>0</span></p>
                <ul class="row w-100 mr-1">
                    <div class="col-6">
                        <li class="w-100 btn btn-success">Increase</li>
                    </div>
                    <div class="col-6">
                        <li class="w-100 btn btn-warning">Decrease</li>
                    </div>
                    <div class="col col-xs-12 col-sm-12">
                        <button class="w-100 btn btn-danger mb-2 mt-2">Clear</button>
                    </div>
                </ul>
                <p>Graded Sessions This Week: <span>0</span></p>
                <div class="row">
                    <div class="col col-xs-12 col-sm-12">
                        <button class="w-100 btn btn-danger mb-2">Reset</button>
                    </div>
                </div>
            </section>
        </nav>
        <main
            class="mt-5 col-xs-12 col-sm-12 col-md-8 col-lg-9 text-white order-1 order-xs-1 order-sm-1 order-md-2 order-lg-2">
            <div class="row bg-dark p-4">
                <h3 class="m-0 p-0 mb-4 mt-1">Tutoring</h3>
                <table class="table table-sm text-white">
                    <thead>
                        <tr>
                            <th scope="col">Booked This Week</th>
                            <th scope="col">Complete This Week</th>
                            <th scope="col">Remaining This Week</th>
                        </tr>
                    </thead>
                    <div class="table-responsive">
                        <tbody>
                            <tr>
                                <td>
                                    <p><span id="booked-sessions" class=""></span> sessions</p>
                                </td>
                                <td class="col">
                                    <p><span id="complete-tutor-sessions" class=""></span> sessions</p>
                                </td>
                                <td>
                                    <p><span id="tutor-sessions-left" class=""></span> sessions</p>
                                </td>
                            </tr>
                        </tbody>
                </table>
                <h3 class="m-0 p-0 mb-4">Grading</h3>
                <table class="table table-sm text-white">
                    <thead>
                        <tr>

                            <th scope="col">Needed This Week</th>
                            <th scope="col">Complete This Week</th>
                            <th scope="col">Grading Hours Needed Per Day</th>
                        </tr>
                    </thead>
                    <div class="table-responsive">
                        <tbody>
                            <tr>
                                <td>
                                    <p><span id="graded-sessions-needed" class=""></span> hours</p>
                                </td>
                                <td>
                                    <p><span id="complete-grading-sessions" class=""></span> hours</p>
                                </td>
                                <td>
                                    <p><span id="grading-hours-per-day" class=""></span> hours</p>
                                </td>
                            </tr>
                        </tbody>
                </table>
                <h3 class="m-0 p-0 mb-4">Weekly Totals</h3>
                <table class="table table-sm text-white">
                    <thead>
                        <tr>
                            <th scope="col">Regular Hours</th>
                            <th scope="col">Overtime Hours</th>
                        </tr>
                    </thead>
                    <div class="table-responsive">
                        <tbody>
                            <tr>
                                <td>
                                    <p><span id="weekly-total-hours" class=""></span> hours</p>
                                </td>
                                <td>
                                    <p><span id="weekly-ovetime-hours" class=""></span> hours</p>
                                </td>
                                
                            </tr>
                        </tbody>
                </table>
            </div>
        </main>
    </section>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"
        integrity="sha512-qTXRIMyZIFb8iQcfjXWCO8+M5Tbc38Qi5WzdPOYZHIlZpzBHG3L3by84BBBOiRGiEb7KKtAOAs5qYdUiZiQNNQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>
    <script src="./assets/constants.js"></script>
    <script src="./assets/app.js"></script>
</body>

</html>
